const express = require('express');
const { admin, db } = require('../auth/firebase');
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

/* ================= */
/* UTILITY FUNCTIONS */
/* ================= */

async function getUserData(userId){
    const userRef = db.collection('user');

    const userDoc = await userRef.doc(userId).get();
    const userData = userDoc.data();
    if(userData){
           var ret = {userId:userData.userid, firstname:userData.firstname, lastname:userData.lastname, latitude:userData.latitude, longitude:userData.longitude, email:userData.email};
           return ret;
    }
    return {error: 'No user found with that userid'};
}

// check if there's a valid invitation with email & groupid.
async function checkInvitation(inviteId, email){

    const invitationsRef = db.collection('invitations');
    const invitationsDoc = await invitationsRef.doc(inviteId).get();
    const invitationsData = invitationsDoc.data();

    if(invitationsData === undefined || invitationsData.email.toLowerCase() != email.toLowerCase()){
        return false;
    }
    return true;
}

function checkParameters(params) {
    for (let i = 0; i < params.length; i++)
        if (params[i] === undefined)
            return false;
        
    return true;
}

async function authorizeUser(userId, authToken) {
    const currTime = Date.now();
    const userRef = db.collection('user').doc(userId);

    const userDoc = await userRef.get();

    // check if user exists
    if (!userDoc.exists)
        return false;

    // check if input token matches user's token and it is not past expiration
    if (userDoc.data().token === authToken && userDoc.data().expiration >= currTime) {
        return true;
    }

    return false;
}

// return true if it's a duplicate invite
async function checkDuplicateInvitation(email, groupId){
    const invitationsRef = db.collection('invitations');

    const invitationsDoc = await invitationsRef.doc(email.toLowerCase() + groupId).get();
    const invitationsData = invitationsDoc.data();

    // If it's undefined, it's not a duplicate
    if(invitationsData === undefined){
        return false;
    }
    // duplicate
    return true;
}

// Check if userid is the owner of the group
async function isUserOwnerOfGroup(userid, groupid){
    const groupRef = db.collection('group');

    const groupDoc = await groupRef.doc(groupid).get();
    const groupData = groupDoc.data();

    if(groupData === undefined || groupData.ownerid != userid){
        return false;
    }

    return true;
}

/* ================= */
/*   API ENDPOINTS   */
/* ================= */


// Invite participant by email to groupId.
/**
 *  @swagger
 * /api/inviteparticipant:
 *      post:
 *          description: Invite a user
 *          tags:
 *          - group
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - userId
 *              - userToken
 *              - email
 *              - groupId
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  email:
 *                      type: string
 *                  groupId:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized client
 *              404:
 *                  description: Failure
 */
 router.post('/inviteparticipant', async (req, res, next) => {
    const {userId, userToken, email, groupId} = req.body;
    var status = 200;
    var error = '';
    
    if (!checkParameters([userId, userToken, groupId, email.toLowerCase()])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else if (!(await isUserOwnerOfGroup(userId, groupId))){
        error = "Only the owner of the group can invite participants";
        status = 401;
    } // Check if the person has been already invited.
    else if ((await checkDuplicateInvitation(email.toLowerCase(), groupId))){
        error = "This person was already invited";
        status = 401;
    }
    else{
        const data = {
            groupid: groupId,
            email: email.toLowerCase(),
            inviter: userId,
            inviteId: email.toLowerCase()+groupId
        };
          
        // Add a new document in collection "invitations" with an invitation
        const response = await db.collection('invitations').doc(email.toLowerCase()+groupId).set(data);
    }

    var ret = { error: error };

    res.status(status).json(ret);
});

/**
 *  @swagger
 * /api/acceptinvitation:
 *      post:
 *          description: Accept an open invitation
 *          tags:
 *          - group
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - inviteId
 *              - userId
 *              - userToken
 *              - email
 *              - groupId
 *              properties:
 *                  inviteId:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  email:
 *                      type: string
 *                  groupId:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized client
 *              404:
 *                  description: Failure
 */
router.post('/acceptinvitation', async (req, res, next) => {
    const {inviteId, userId, userToken, email, groupId} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([inviteId, userId, userToken, email.toLowerCase(), groupId])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        // Check if email and inviteId are valid
        var doesInvitationExist = await checkInvitation(inviteId, email.toLowerCase());
    
        // Edge Case #: Group was deleted but invitation is still on the user's invite list because page wasn't updated.
        if(!doesInvitationExist){
            error = "An invitation for this user doesn't exist.";
            status = 400;
        }
        else{
            const response = await db.collection('invitations').doc(inviteId).delete();
    
            const data = {
                groupid: groupId,
                userid: userId
            };
    
            const addtogroup = await db.collection('groupmember').doc(userId+groupId).set(data);
        }
    }

    var ret = { error: error };

    res.status(status).json(ret);
});

/**
 *  @swagger
 * /api/declineinvitation:
 *      post:
 *          description: Decline an open invitation
 *          tags:
 *          - group
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - inviteId
 *              - userId
 *              - userToken
 *              - email
 *              properties:
 *                  inviteId:
 *                      type: string
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: number
 *                  email:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized client
 *              404:
 *                  description: Failure
 */
router.post('/declineinvitation', async (req, res, next) => {
    const {inviteId, userId, userToken, email} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([inviteId, userId, userToken, email.toLowerCase()])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        // Check if email and inviteId are valid
        var doesInvitationExist = await checkInvitation(inviteId, email.toLowerCase());
    
        if(!doesInvitationExist){
            error = "An invitation for this user doesn't exist.";
            status = 400;
        }
        else{
            const response = await db.collection('invitations').doc(inviteId).delete();
        }
    }

    var ret = { error: error };

    res.status(status).json(ret);
});


/**
 *  @swagger
 * /api/listinvites:
 *      post:
 *          description: Get user's open invites
 *          tags:
 *          - group
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - userId
 *              - userToken
 *              - email
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: number
 *                  email:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              400:
 *                  description: Bad request
 *              401:
 *                  description: Unauthorized client
 *              404:
 *                  description: Failure
 */
router.post('/listinvites', async (req, res, next) => {
    const {userId, userToken, email} = req.body;

    var error = '';
    var status = 200;
    var allInvites = [];

    if (!checkParameters([userId, userToken, email.toLowerCase()])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        const invitationsRef = db.collection('invitations');
        const groupRef = db.collection('group');

        try {
            // get all open invitations for email
            var querySnapshot = await invitationsRef.where('email', '==', email.toLowerCase()).get();
            
            console.log(querySnapshot.docs.length);
    
            for (let i in querySnapshot.docs) {
                const currInvitation = querySnapshot.docs[i].data();

                // Get group data (in order to get groupname)
                const groupDoc = await groupRef.doc(currInvitation.groupid).get();
                console.log(currInvitation.groupid);
                const groupData = groupDoc.data();
                var gpName = groupData.groupname;

                // Get user data
                var inviterData = await getUserData(currInvitation.inviter);
                var inviteFrom = inviterData.firstname + " " + inviterData.lastname;

                allInvites.push({ inviteId: currInvitation.inviteId, groupname: gpName, from: inviteFrom, groupId: currInvitation.groupid});
            }
            console.log(allInvites);
        }
        catch(e) {
            error = e.toString();
            console.error(error);
            status = 404;
        }
    }

    var ret = { invitedata: allInvites, error: error };
    res.status(status).json(ret);
    // returns all groups that userid is a part of.
});

module.exports = router;
