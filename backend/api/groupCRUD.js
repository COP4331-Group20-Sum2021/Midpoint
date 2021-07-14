const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = API HERE = = = = = = = = = = 

// Add participant userId to groupId
router.post('/addparticipant', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if userid is a valid entry
    // Todo: Check if groupId is a valid group
    
    const data = {
        groupid: groupId,
        userid: userId
    };
      
      // Add a new document in collection "groupmember" with auto-ID
    const response = await db.collection('groupmember').doc(userId+groupId).set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});

// Add participant userId to groupId
router.post('/removemyself', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    // Todo: Check userToken
    // Todo: Check if userid is a valid entry
    // Todo: Check if groupId is a valid group

    const response = await db.collection('groupmember').doc(userId+groupId).delete();

    var ret = { error: error };

    res.status(status).json(ret);
});



// = = = = = = = = = = API ENDS = = = = = = = = = = 

module.exports = router;