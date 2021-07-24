const express = require('express');
// const locationAPI = require('locationapi'); --> module.exports only with router

const { admin, db } = require('../auth/firebase');

const router = express.Router();


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
        allMembers.push({ userid: `${currGroupMember.userid}`, name: userData.name, email: userData.email, lat: userData.latitude, lon: userData.longitude, });
    }
    return allMembers;
}

// List groups
/**
 *  @swagger
 * /api/listgroups:
 *      post:
 *          description: Get list of groups
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
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
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
            // get all correct group members
            var querySnapshot = await groupmemberRef.where('userid', '==', `${userId}`).get();
            
            console.log(querySnapshot.docs.length);
    
            for (let i in querySnapshot.docs) {
                const currGroupMember = querySnapshot.docs[i].data();
                const groupDoc = await groupRef.doc(`${currGroupMember.groupid}`).get();
                const groupData = groupDoc.data();
                var groupMembers = await getParticipantsOfGroupId(`${currGroupMember.groupid}`);
                allGroups.push({ groupid: `${currGroupMember.groupid}`, groupname: groupData.groupname, participants: groupMembers});
            }
            
            console.log(allGroups);
        }
        catch(e) {
            error = e.toString();
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
    } // TODO: CHECK IF userID is owner of groupid.
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
 *              404:
 *                  description: Failure
 */
router.delete('/deletegroup', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    const groupmemberRef = db.collection('groupmember');
    var error = "";
    var status = 200;

    if (!checkParameters([userId, userToken, groupId])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else if(!(await authorizeUser(userId, userToken))){
        error = 'User unauthorized';
        status = 401;
    } // TODO: CHECK IF userID is owner of groupid.
    else{
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
    }

    var ret = { error: error };
    res.status(status).json(ret);
});


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
 *          - in: body
 *            name: request
 *            schema: 
 *              type: object
 *              required:
 *              - userId
 *              - email
 *              - lat
 *              - lon
 *              - auth
 *              properties:
 *                  userId:
 *                      type: string
 *                  email:
 *                      type: string
 *                  lat:
 *                      type: double
 *                  long:
 *                      type: double
 *                  auth:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/login', async (req, res, next) => {
    const userRef = db.collection('user');
    const {userId, email, lat, lon, auth, expiration} = req.body;
    var status = 200;
    var error = '';

    if (!checkParameters([userId, email, lat, lon, auth, expiration])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else{
        const userDoc = await userRef.doc(userId).get();
        const userData = userDoc.data();
        
        if(userData === undefined){
            const userDocEmail = await userRef.doc(email).get();
            const userDataEmail = userDocEmail.data();
            if(userDataEmail === undefined){
                // BAD
                status = 401;
                error = "User not registered so login failed";
            }
            else{
                const data = {
                    userid: userId,
                    firstname: userDataEmail.firstname,
                    lastname: userDataEmail.lastname,
                    latitude: lat,
                    longitude: lon,
                    token: auth,
                    expiration: expiration,
                    email: email
                };
                const responseTwo = await userRef.doc(userId).set(data);
                const response = await userRef.doc(email).delete();
            }
        }
        else{
            const result = userRef.doc(userId).update({
                latitude: lat,
                longitude: lon,
                token:auth,
                expiration: expiration
            });
        }
    }
    var ret = { error: error };
    res.status(status).json(ret);
});

router.post('/register', async (req, res, next) => {
    const {email, firstname, lastname} = req.body;
    var status = 200;
    var error = '';

    const data = {
        userid: -1,
        firstname: firstname,
        lastname: lastname,
        latitude: -1,
        longitude: -1,
        token: 'temp',
        expiration: "temp",
        email: email
    };
      
    const response = await db.collection('user').doc(email).set(data);

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
 *              404:
 *                  description: Failure
 */
router.delete('/removemyself', async (req, res, next) => {
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
 *              404:
 *                  description: Failure
 */
router.delete('/kickfromgroup', async (req, res, next) => {
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
