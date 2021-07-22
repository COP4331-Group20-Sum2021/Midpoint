const express = require('express');
const axios = require('axios');
const { admin, db } = require('../auth/firebase');
const { Navigator } = require('node-navigator');

// require('dotenv').config()
const router = express.Router();

const navigator = new Navigator();
const key = process.env.GOOGLE_API_KEY; // **NEED TO FIX** (restart environment?)

// update location
// receives userid + auth token + lat + lon
// posts location to database
// returns error
/**
 *  @swagger
 * /api/updateLocation:
 *      post:
 *          description: Update User Location
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
 *              - latitude
 *              - longitude
 *              properties:
 *                  userId:
 *                      type: string
 *                  userToken:
 *                      type: string
 *                  latitude:
 *                      type: number
 *                  longitude:
 *                      type: number
 *          responses:
 *              200:
 *                  description: Success
 *              404:
 *                  description: Failure
 */
router.post('/updatelocation', async (req, res, next) => {
    const {userId, userToken, latitude, longitude} = req.body;
    var status = 200;
    var error = '';

    const userRef = db.collection('user').doc(`${userId}`);

    // authorize token **TO DO**

    // see if userId from req.body exists in the database
    await userRef.get().then(
        snapshot => {
            if (!snapshot.exists) {
                error = 'User does not exist';
                status = 404;
            }
        });
       
    if (!error) {
        // update data in user
        const result = userRef.update({
            latitude: latitude,
            longitude: longitude
        });
    }

    var ret = { error: error };

    res.status(status).json(ret);
});

// retrieve group data
// receives userid + auth token + groupid
// gets groupmember locations
// returns list of groupmember locations/names, midpoint location
/**
 *  @swagger
 * /api/retrievegroupdata:
 *      post:
 *          description: Get Group Data
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
router.post('/retrievegroupdata', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    //var radius = 1500; // **in meters**
    var status = 200;
    var error = '';
    var groupMemberLocations = [];
    //var nearbyEstablishments = [];
    var midpointLocation;

    const groupmemberRef = db.collection('groupmember');
    const userRef = db.collection('user');

    // authorize token **TO DO**

    try {
        // get all correct group members
        var querySnapshot = await groupmemberRef.where('groupid', '==', `${groupId}`).get();
        
        // loop through groupmembers and push locations
        for (let i in querySnapshot.docs) {
            const currUserData = querySnapshot.docs[i].data();
            const userDoc = await userRef.doc(`${currUserData.userid}`).get();
            const userData = userDoc.data();

            groupMemberLocations.push({ firstname: userData.firstname, lastname: userData.lastname, latitude: userData.latitude, longitude: userData.longitude});
        }
        
        // get midpoint location between all group members
        midpointLocation = getMidpoint(groupMemberLocations);

        /*
        // get list of nearby establishments, relative to midpoint
        var snapshot = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpointLocation.latitude},${midpointLocation.longitude}&radius=${radius}&key=${key}`
        );

        // push all search results into return array
        for (let i in snapshot.data.results) {
            nearbyEstablishments.push(snapshot.data.results[i]);
        }
        */
    }
    catch(e) {
        error = e.toString();
        status = 404;
    }

    var ret = { grouplocations: groupMemberLocations, midpoint: midpointLocation, error: error };
    
    res.status(status).json(ret);
});

// function for finding the mathematical midpoint from a list of coordinates
// receives a list of lat/lon coordinates
// returns a midpoint lat/lon coordinate
function getMidpoint(locations) {
    // initial values
    let smallestLatitude = locations[0].latitude;
    let largestLatitude = locations[0].latitude;
    let smallestLongitude = locations[0].longitude;
    let largestLongitude = locations[0].longitude;

    // loop through whole list and save the smallest/largest latitude and longitude
    for (let i = 1; i < locations.length; i++) {
        if (locations[i].latitude < smallestLatitude) smallestLatitude = locations[i].latitude
        else if (locations[i].latitude > largestLatitude) largestLatitude = locations[i].latitude

        if (locations[i].longitude < smallestLongitude) smallestLongitude = locations[i].longitude
        else if (locations[i].longitude > largestLongitude) largestLongitude = locations[i].longitude
    }

    // calculate halfway point between latitude and longitude
    let midPointLat = (smallestLatitude + largestLatitude) / 2;
    let midPointLong = (smallestLongitude + largestLongitude) / 2;

    return { latitude: midPointLat, longitude: midPointLong };
}

module.exports = router;