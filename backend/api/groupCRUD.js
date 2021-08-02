const express = require('express');
const { admin, db } = require('../auth/firebase');
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

/* ================= */
/* UTILITY FUNCTIONS */
/* ================= */

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

async function getParticipantsOfGroupId(groupId){
    var allMembers = [];

    const groupmemberRef = db.collection('groupmember');
    const userRef = db.collection('user');

    var querySnapshot = await groupmemberRef.where('groupid', '==', `${groupId}`).get();

    for (let i in querySnapshot.docs) {
        const currGroupMember = querySnapshot.docs[i].data();

        const userDoc = await userRef.doc(`${currGroupMember.userid}`).get();
        const userData = userDoc.data();

        allMembers.push({ userid: `${currGroupMember.userid}`, firstname: userData.firstname, lastname: userData.lastname, email: userData.email, lat: userData.latitude, lon: userData.longitude});
    }

    return allMembers;
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
/*   API ENDPOINTS  */
/* ================= */


// List groups
/**
 *  @swagger
 * /api/listgroups:
 *      post:
 *          description: Get user's groups
 *          tags:
 *          - user
 *          parameters:
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - userId
 *              - userToken
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
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
router.post('/listgroups', async (req, res, next) => {
    const {userId, userToken} = req.body;

    var error = '';
    var status = 200;
    var allGroups = [];

    if (!checkParameters([userId, userToken])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        const groupmemberRef = db.collection('groupmember');
        const groupRef = db.collection('group');

        try {
            // get all membership entries of user
            var querySnapshot = await groupmemberRef.where('userid', '==', `${userId}`).get();
    
            for (let i in querySnapshot.docs) {

                const currGroupMember = querySnapshot.docs[i].data();

                const groupDoc = await groupRef.doc(`${currGroupMember.groupid}`).get();

                // Edge Case. User is a participant of a group that was disbanded
                if (!groupDoc){
                    error = "Error fetching groupid: " + currGroupMember.groupid;
                    status = 500; // Internal Server Error.
                    break;
                }

                const groupData = groupDoc.data();

                var groupMembers = await getParticipantsOfGroupId(`${currGroupMember.groupid}`);

                allGroups.push({ groupid: `${currGroupMember.groupid}`, groupname: groupData.groupname, participants: groupMembers});
            }
            
            console.log(allGroups);
        }
        catch(e) {
            error = e.toString();
            console.error(error);
            status = 404;
        }
    }

    var ret = { groupdata: allGroups, error: error };
    res.status(status).json(ret);
    // returns all groups that userid is a part of.
});


// Add group
/**
 *  @swagger
 * /api/creategroup:
 *      post:
 *          description: Create a new group
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
 *              - groupname
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  groupname:
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
router.post('/creategroup', async (req, res, next) => {
    const {userId, userToken, groupname} = req.body;
    var status = 200;
    var error = "";
    var ret = {};

    if (!checkParameters([userId, userToken, groupname])) {
        error = 'Incorrect parameters';
        status = 400;
        ret = {error: error};
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
        ret = {error: error};
    }
    else{
        // Create the group on the db
        const group = await db.collection('group').add({
            groupname: groupname,
            ownerid: userId
        });
    
        // add the user as a the groupmember in the db
        const data = {
            groupid: group.id,
            userid: userId
        };
    
        const addtogroup = await db.collection('groupmember').doc(userId+group.id).set(data);
        ret = { groupid: group.id, ownerid: userId, error: error };
    }
    res.status(status).json(ret);
});

// Edit group
/**
 *  @swagger
 * /api/editgroup:
 *      put:
 *          description: Edit a group
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
 *              - groupId
 *              - groupname
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  groupId:
 *                      type: string
 *                  groupname:
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
router.put('/editgroup', async (req, res, next) => {
    const {userId, userToken, groupId, groupname} = req.body;
    var status = 200;
    var error = "";

    if (!checkParameters([userId, userToken, groupId, groupname])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else if (!(await isUserOwnerOfGroup(userId, groupId))){
        error = "Only the owner of the group can edit the group";
        status = 401;
    }
    else{
        const group = {
            groupname: groupname,
            ownerid: userId
        };
        const response = await db.collection('group').doc(groupId).set(group);
    }    

    var ret = { error: error };
    res.status(status).json(ret);
    // Edits the group record and returns if the operation was successful
});

// Delete group
/**
 *  @swagger
 * /api/deletegroup:
 *      delete:
 *          description: Delete a group
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
 *              - groupId
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
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
router.delete('/deletegroup', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    const groupmemberRef = db.collection('groupmember');
    const invitationsRef = db.collection('invitations');

    var error = "";
    var status = 200;

    if (!checkParameters([userId, userToken, groupId])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    } 
    else if (!(await isUserOwnerOfGroup(userId, groupId))){
        error = "Only the owner of the group can delete the group";
        status = 401;
    }
    else{
        try {
            // get all correct group members
            var querySnapshot = await groupmemberRef.where('groupid', '==', `${groupId}`).get();
            
            //console.log(querySnapshot.docs.length);

            // Delete all groupmembers:
            for (let i in querySnapshot.docs) {
    
                const currGroupMember = querySnapshot.docs[i].data();
                const primaryKeyOfGroupMember = `${currGroupMember.userid}` + `${currGroupMember.groupid}`;
                const response = await db.collection('groupmember').doc(primaryKeyOfGroupMember).delete();
            }

            // Get all active invitations for that group:
            var querySnapshotInv = await invitationsRef.where('groupid', '==', `${groupId}`).get();

            // Delete all invitations for that user
            for (let i in querySnapshotInv.docs) {
    
                const currInvitation = querySnapshotInv.docs[i].data();
                const currInvitationID = currInvitation.inviteId;
                const response = await db.collection('invitations').doc(currInvitationID).delete();
            }
    
            // Delete group reference
            const responseTwo = await db.collection('group').doc(groupId).delete();
        }
        catch(e) {
            error = e.toString();
            console.error(error);
            status = 404;
        }
    }

    var ret = { error: error };
    res.status(status).json(ret);
});

// Remove participant userId from groupId
// If the user is not on the group, it doesn't matter
// If the group doesn't exist, that's fine too lol firebase is magical
/**
 *  @swagger
 * /api/removemyself:
 *      delete:
 *          description: Remove myself from a group
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
 *              - groupId
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
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
router.delete('/removemyself', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    const groupmemberRef = db.collection('groupmember');
    const invitationsRef = db.collection('invitations');
    var status = 200;
    var error = '';

    if (!checkParameters([groupId, userId, userToken])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else{
        // If the user is the owner, we need to nuke the group and all members on it lol
        if ((await isUserOwnerOfGroup(userId, groupId))){
            try {
                // get all correct group members
                var querySnapshot = await groupmemberRef.where('groupid', '==', `${groupId}`).get();
                
                console.log(querySnapshot.docs.length);
        
                for (let i in querySnapshot.docs) {
        
                    const currGroupMember = querySnapshot.docs[i].data();
                    const primaryKeyOfGroupMember = `${currGroupMember.userid}` + `${currGroupMember.groupid}`;
                    const response = await db.collection('groupmember').doc(primaryKeyOfGroupMember).delete();
                }

                // Get all active invitations for that group:
                var querySnapshotInv = await invitationsRef.where('groupid', '==', `${groupId}`).get();
    
                // Delete all invitations for that user
                for (let i in querySnapshotInv.docs) {
        
                    const currInvitation = querySnapshotInv.docs[i].data();
                    const currInvitationID = currInvitation.inviteId;
                    const response = await db.collection('invitations').doc(currInvitationID).delete();
                }
        
                const responseTwo = await db.collection('group').doc(groupId).delete();
            }
            catch(e) {
                error = e.toString();
                console.error(error);
                status = 404;
            }
        }
        else{
            const response = await db.collection('groupmember').doc(userId+groupId).delete();
        }
    }
    var ret = { error: error };
    res.status(status).json(ret);
});

// Ownerid is kicking userid from groupid
/**
 *  @swagger
 * /api/kickfromgroup:
 *      delete:
 *          description: Remove a user from a group
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
 *              - userId
 *              - groupId
 *              properties:
 *                  ownerId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  userId:
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
router.delete('/kickfromgroup', async (req, res, next) => {
    const {ownerId, userToken, userId, groupId} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([ownerId, userId, userToken, groupId])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(ownerId, userToken))){
        error = 'User unauthorized';
        status = 401;
    }
    else if (!(await isUserOwnerOfGroup(ownerId, groupId))){
        error = "Only the owner of the group can kick participants";
        status = 401;
    }
    else if (ownerId === userId){
        error = "Owner can't kick himself.";
        status = 401;
    }
    else{
        const response = await db.collection('groupmember').doc(userId+groupId).delete();
    }

    var ret = { error: error };
    res.status(status).json(ret);
});

module.exports = router;