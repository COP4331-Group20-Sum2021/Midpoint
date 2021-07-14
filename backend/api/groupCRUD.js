const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = API HERE = = = = = = = = = = 

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
    const response = await db.collection('invitation').doc(userId+groupId).delete();

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