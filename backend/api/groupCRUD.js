const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = @Wes & Nate = = = = = = = = = = 


// List groups
/**
 *  @swagger
 * /api/listgroups:
 *      post:
 *          description: Get list of groups
 *          tags:
 *          - group
 *          parameters:
 *          - name: userId 
 *            description: ID of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase Auth Token of user
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/listgroups', async (req, res, next) => {
    const {userId, userToken} = req.body;
    const groupmemberRef = db.collection('groupmember');
    const groupRef = db.collection('group');
    var error = '';
    var status = 200;
    var allGroups = [];
    
    try {
        // get all correct group members
        var querySnapshot = await groupmemberRef.where('userid', '==', `${userId}`).get();
        
        console.log(querySnapshot.docs.length);

        for (let i in querySnapshot.docs) {
            const currGroupMember = querySnapshot.docs[i].data();
            const groupDoc = await groupRef.doc(`${currGroupMember.groupid}`).get();
            const groupData = groupDoc.data();

            allGroups.push({ groupid: `${currGroupMember.groupid}`, groupname: groupData.groupname});
        }
        
        console.log(allGroups);
    }
    catch(e) {
        error = e.toString();
        status = 404;
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
 *          - name: userId 
 *            description: ID of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase Auth Token of user
 *            in: query
 *            type: String
 *          - name: groupname 
 *            description: Name of the new group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/creategroup', async (req, res, next) => {
    const {userId, userToken, groupname} = req.body;
    var status = 200;
    var error = "";

    const group = {
        groupname: groupname,
        ownerid: userId
    };

    const response = await db.collection('group').doc().set(group);

    var ret = { error: error };
    res.status(status).json(ret);
    // Create a new group record and returns if the operation was successful
});

// Edit group
/**
 *  @swagger
 * /api/editgroup:
 *      post:
 *          description: Edit a group
 *          tags:
 *          - group
 *          parameters:
 *          - name: userId 
 *            description: ID of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase Auth Token of user
 *            in: query
 *            type: String
 *          - name: groupId 
 *            description: ID of group
 *            in: query
 *            type: String
 *          - name: groupname 
 *            description: New name of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/editgroup', async (req, res, next) => {
    const {userId, userToken, groupId, groupname} = req.body;
    var status = 200;
    var error = "";

    const group = {
        groupname: groupname,
        ownerid: userId
    };

    const response = await db.collection('group').doc(groupId).set(group);

    var ret = { error: error };
    res.status(status).json(ret);
    // Edits the group record and returns if the operation was successful
});

// Delete group
/**
 *  @swagger
 * /api/deletegroup:
 *      post:
 *          description: Delete a group
 *          tags:
 *          - group
 *          parameters:
 *          - name: userId 
 *            description: ID of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase Auth Token of user
 *            in: query
 *            type: String
 *          - name: groupId 
 *            description: ID of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/deletegroup', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    const groupmemberRef = db.collection('groupmember');
    var error = "";
    var status = 200;

    try {
        // get all correct group members
        var querySnapshot = await groupmemberRef.where('groupid', '==', `${groupId}`).get();
        
        console.log(querySnapshot.docs.length);

        for (let i in querySnapshot.docs) {

            const currGroupMember = querySnapshot.docs[i].data();
            const primaryKeyOfGroupMember = `${currGroupMember.userid}` + `${currGroupMember.groupid}`;
            const response = await db.collection('groupmember').doc(primaryKeyOfGroupMember).delete();
        }

        const responseTwo = await db.collection('group').doc(groupId).delete();
    }
    catch(e) {
        error = e.toString();
        status = 404;
    }

    var ret = { error: error };
    res.status(status).json(ret);
});


// = = = = = = = = = = @Nate = = = = = = = = = = 


// Create a new user & relate the auth token
// receives userId from firebase, email, user's lat, user's lon & auth token
/**
 *  @swagger
 * /api/createuser:
 *      post:
 *          description: Create a new user
 *          tags:
 *          - user
 *          parameters:
 *          - name: userId 
 *            description: ID of new user
 *            in: query
 *            type: String
 *          - name: email 
 *            description: Email of new user
 *            in: query
 *            type: String
 *          - name: lat 
 *            description: Latitude of new user
 *            in: query
 *            type: String
 *          - name: lon 
 *            description: Longitude of new user
 *            in: query
 *            type: String
 *          - name: auth 
 *            description: Firebase auth token
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/createuser', async (req, res, next) => {
    const {userId, email, lat, lon, auth} = req.body;
    var status = 200;
    var error = '';

    const data = {
        userid: userId,
        username: email,
        latitude: lat,
        longitude: lon,
        token: auth
    };
      
      // Add a new document in collection "invitations" with auto-ID
    const response = await db.collection('user').doc(userId).set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});


// Check if email exists in the list of users
function checkUser(email){
    // @Todo
    return true;
}

// Invite participant by email to groupId.
/**
 *  @swagger
 * /api/inviteparticipant:
 *      post:
 *          description: Invite a user
 *          tags:
 *          - group
 *          parameters:
 *          - name: ownerId 
 *            description: ID of group owner
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase auth token
 *            in: query
 *            type: String
 *          - name: email 
 *            description: Email of invitee
 *            in: query
 *            type: String
 *          - name: groupId 
 *            description: ID of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/inviteparticipant', async (req, res, next) => {
    const {ownerId, userToken, email, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if ownerId is the owner of groupId
    // Todo: Check if groupId is a valid group (important)

    var isUserRegistered = checkUser(email);

    const data = {
        groupid: groupId,
        email: email,
        verified: isUserRegistered, // true or false
        inviter: ownerId    
    };
      
    // Add a new document in collection "invitations" with an invitation
    const response = await db.collection('invitations').doc(email+groupId).set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});

// Todo: find the userid of the user with the respective email
function getUserId(email){
    return 1;
}

// Todo: Check if there's a valid invitation with email & groupid.
function checkInvitation(email, groupId){
    return true;
}

// email accepts the invitation to join the groupId
/**
 *  @swagger
 * /api/acceptinvitation:
 *      post:
 *          description: Accept an open invitation
 *          tags:
 *          - group
 *          parameters:
 *          - name: email 
 *            description: Email of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase auth token
 *            in: query
 *            type: String
 *          - name: groupId 
 *            description: ID of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/acceptinvitation', async (req, res, next) => {
    const {email, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if userid is a valid user (important)
    // Todo: Check if groupId is a valid group (important)
    // Todo: Check if the invitation exists email + groupId

    // If the user is registered, we will get his userId
    var userId = getUserId(email);
    
    // If an invitation for this group exists we will get true
    var doesInvitationExist = checkInvitation(email, groupId);

    if (userId < 0){
        error = "User is not currently registered.";
    }
    else if(!doesInvitationExist){
        error = "An invitation for this user doesn't exist."
    }
    else{
        // "accept" invitation by deleting from invitations and then adding to the group
        const response = await db.collection('invitations').doc(email+groupId).delete();

        const data = {
            groupid: groupId,
            userid: userId
        };

        const addtogroup = await db.collection('groupmember').doc(userId+groupId).set(data);
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
 *      post:
 *          description: Remove myself from a group
 *          tags:
 *          - group
 *          parameters:
 *          - name: userId 
 *            description: ID of user
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase auth token
 *            in: query
 *            type: String
 *          - name: groupId
 *            description: ID of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/removemyself', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    const response = await db.collection('groupmember').doc(userId+groupId).delete();

    var ret = { error: error };

    res.status(status).json(ret);
});

// Ownerid is kicking userid from groupid
/**
 *  @swagger
 * /api/kickfromgroup:
 *      post:
 *          description: Remove a user from a group
 *          tags:
 *          - group
 *          parameters:
 *          - name: ownerId 
 *            description: ID of group owner
 *            in: query
 *            type: String
 *          - name: userToken 
 *            description: Firebase auth token
 *            in: query
 *            type: String
 *          - name: userId
 *            description: ID of user being kicked
 *            in: query
 *            type: String
 *          - name: groupId
 *            description: ID of group
 *            in: query
 *            type: String
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/kickfromgroup', async (req, res, next) => {
    const {ownerId, userToken, userId, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if ownerId is the owner of groupId

    const response = await db.collection('groupmember').doc(userId+groupId).delete();

    var ret = { error: error };

    res.status(status).json(ret);
});


// = = = = = = = = = = API ENDS = = = = = = = = = = 

module.exports = router;