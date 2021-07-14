const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = @Wes & Nate = = = = = = = = = = 


// List groups
router.post('/listgroups', async (req, res, next) => {
    // returns all groups that userid is a part of.
});


// Add group
router.post('/creategroup', async (req, res, next) => {
    // Create a new group record and returns if the operation was successful
});

// Edit group
router.post('/editgroup', async (req, res, next) => {
    // Edits the group record and returns if the operation was successful
});

// Delete group
router.post('/deletegroup', async (req, res, next) => {
    // Delete all groupmembers that participate in groupid.
    // Delete the group record and returns if the operation was successful
});


// = = = = = = = = = = @Nate = = = = = = = = = = 


// Create a new user & relate the auth token
// receives userId from firebase, email, user's lat, user's lon & auth token
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


// Invite participant userId to groupId
router.post('/inviteparticipant', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if userid is a valid user (important)
    // Todo: Check if groupId is a valid group (important)

    const data = {
        groupid: groupId,
        userid: userId
    };
      
      // Add a new document in collection "invitations" with auto-ID
    const response = await db.collection('invitations').doc(userId+groupId).set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});

// userid accepts the invitation to join the groupId
router.post('/acceptinvitation', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if userid is a valid user (important)
    // Todo: Check if groupId is a valid group (important)
    // Todo: Check if the invitation exists userId + groupId


    // "accept" invitation by deleting from invitations and then adding to the group
    const response = await db.collection('invitations').doc(userId+groupId).delete();

    const data = {
        groupid: groupId,
        userid: userId
    };

    const addtogroup = await db.collection('groupmember').doc(userId+groupId).set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});

// Remove participant userId from groupId
// If the user is not on the group, it doesn't matter
// If the group doesn't exist, that's fine too lol firebase is magical
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