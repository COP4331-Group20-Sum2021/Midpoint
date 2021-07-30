const express = require('express');
const { admin, db } = require('../auth/firebase');
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

/* ================= */
/* UTILITY FUNCTIONS */
/* ================= */

// check if there's a valid invitation with email & groupid.
async function checkInvitation(inviteId, email){

    const invitationsRef = db.collection('invitations');
    const invitationsDoc = await invitationsRef.doc(inviteId).get();
    const invitationsData = invitationsDoc.data();

    if(invitationsData === undefined || invitationsData.email != email){
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

    const invitationsDoc = await invitationsRef.doc(email + groupId).get();
    const invitationsData = invitationsDoc.data();

    // If it's undefined, it's not a duplicate
    if(invitationsData === undefined){
        return false;
    }
    // duplicate
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
 *              - ownerId
 *              - userToken
 *              - email
 *              - groupId
 *              properties:
 *                  ownerId:
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
 *              404:
 *                  description: Failure
 */
 router.post('/inviteparticipant', async (req, res, next) => {
    const {userId, userToken, email, groupId} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([userId, userToken, groupId, email])) {
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
    else if ((await checkDuplicateInvitation(email, groupId))){
        error = "This person was already invited";
        status = 401;
    }
    else{
        const data = {
            groupid: groupId,
            email: email,
            inviter: userId,
            inviteId: email+groupId
        };
          
        // Add a new document in collection "invitations" with an invitation
        const response = await db.collection('invitations').doc(email+groupId).set(data);
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
 *              - email
 *              - userToken
 *              - groupId
 *              properties:
 *                  email:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  groupId:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/acceptinvitation', async (req, res, next) => {
    const {inviteId, userId, userToken, email, groupId} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([inviteId, userId, userToken, email, groupId])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        // Check if email and inviteId are valid
        var doesInvitationExist = await checkInvitation(inviteId, email);
    
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

router.post('/declineinvitation', async (req, res, next) => {
    const {inviteId, userId, userToken, email} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([inviteId, userId, userToken, email])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        // Check if email and inviteId are valid
        var doesInvitationExist = await checkInvitation(inviteId, email);
    
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

router.post('/listinvites', async (req, res, next) => {
    const {userId, userToken, email} = req.body;

    var error = '';
    var status = 200;
    var allInvites = [];

    if (!checkParameters([userId, userToken, email])) {
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
            var querySnapshot = await invitationsRef.where('email', '==', email).get();
            
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