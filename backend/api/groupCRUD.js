const express = require('express');
const { admin, db } = require('../auth/firebase');

const router = express.Router();

// = = = = = = = = = = @Wes & Nate = = = = = = = = = = 


// List groups
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