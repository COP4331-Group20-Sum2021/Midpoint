const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { Navigator } = require('node-navigator');
require('dotenv').config();

const app = express();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const navigator = new Navigator();
const key = process.env.GOOGLE_API_KEY; // **NEED TO FIX** (restart environment?)

// update location
// receives userid + auth token
// posts location to database
// returns error
app.post('/api/updatelocation', async (req, res, next) => {
    const {userId, userToken} = req.body;
    var error = '';

    const userRef = db.collection('user').doc(`${userId}`);

    // authorize token **TO DO**

    // see if userId from req.body exists in the database
    await userRef.get().then(
        snapshot => {
            if (!snapshot.exists) {
                error = 'User does not exist';
            }
        });

    if (!error) {
        // create data to be insterted into collection (updated location)
        // first param: callback function for handling location data
        navigator.geolocation.getCurrentPosition(
            position => {
                // update data in user
                const result = userRef.update({
                    latitude: position.latitude,
                    longitude: position.longitude
                });
            }
        );
    }

    var ret = { error: error };

    res.status(200).json(ret);
});

// retrieve group data
// receives userid + auth token+ groupid
// gets groupmember locations
// returns list of groupmember locations, midpoint location, list of nearby establishments
app.post('/api/retrievegroupdata', async (req, res, next) => {
    const {userId, userToken, groupId} = req.body;
    var radius = 1500; // **in meters**
    var error = '';
    var groupMemberLocations = [];
    var nearbyEstablishments = [];
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

            groupMemberLocations.push({ latitude: userData.latitude, longitude: userData.longitude});
        }
        
        // get midpoint location between all group members
        midpointLocation = getMidpoint(groupMemberLocations);

        // get list of nearby establishments, relative to midpoint
        var snapshot = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${midpointLocation.latitude},${midpointLocation.longitude}&radius=${radius}&key=${key}`
        );
        
        // push all search results into return array
        for (let i in snapshot.data.results) {
            nearbyEstablishments.push(snapshot.data.results[i]);
        }
    }
    catch(e) {
        error = e.toString();
    }

    var ret = { grouplocations: groupMemberLocations, midpoint: midpointLocation, nearbyestablishments: nearbyEstablishments, error: error };
    
    res.status(200).json(ret);
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