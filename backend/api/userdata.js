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

/* ================= */
/*     API ROUTES    */
/* ================= */

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

    if (!checkParameters([email, firstname, lastname])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    else{
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
    }

    var ret = { error: error };
    res.status(status).json(ret);
});

router.post('/getuserdata', async (req, res, next) => {
    const {userId} = req.body;
    var status = 200;
    var error = '';
    var ret = {};

    if (!checkParameters([userId])) {
        error = 'Incorrect parameters';
        status = 400;
        ret = { error: error };
    }
    else{
        ret = await getUserData(userId);
    }

    res.status(status).json(ret);
});

module.exports = router;