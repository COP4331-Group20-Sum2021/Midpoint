const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = API HERE = = = = = = = = = = 

router.post('/addparticipant', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var status = 200;
    var error = '';

    const data = {
        groupid: groupId,
        userid: userId
    };
      
      // Add a new document in collection "groupmember" with auto-ID
    const response = await db.collection('groupmember').doc().set(data);

    var ret = { error: error };

    res.status(status).json(ret);
});



// = = = = = = = = = = API ENDS = = = = = = = = = = 

module.exports = router;