const express = require('express');
const axios = require('axios');
const { admin, db } = require('../auth/firebase');
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

const MAX_RETRY = 10;
let currentRetry = 0;

function successHandler() {
  console.log('Data is Ready');
}

function errorHandler(url) {
  if (currentRetry < MAX_RETRY) {
    currentRetry++;
    console.log('Retrying...');
    sendWithRetry(url);
  } else {
    console.log('Retried several times but still failed');
  }
}

function sendWithRetry(url) {
  axios.get(url)
    .then(successHandler).catch(errorHandler);
}

axios.interceptors.response.use(function (response) {
  if (response.data.status == "INVALID_REQUEST") {
    throw new axios.Cancel('Operation canceled by the user.');
  } else {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});

/* ================= */
/* UTILITY FUNCTIONS */
/* ================= */

function checkParameters(params) {
    for (let i = 0; i < params.length; i++)
        if (params[i] === undefined)
            return false;
        
    return true;
}

// Convert degree of latitude and longitude to km in order to check if a point is inside the circle
function isEstablishmentInsideCircleRadius(center, newPoint){
    // kilometers per degree
    var convertedY = 1000/9;
    var convertedX = Math.cos(Math.PI * center.lat / 180.0) * convertedY;

    var differenceInX = Math.abs(center.lon - newPoint.lon) * convertedX;
    var differenceInY = Math.abs(center.lat - newPoint.lat) * convertedY;

    // Pythagorean theorem with converted degrees
    // 3 is in km
    console.log(Math.sqrt(differenceInX * differenceInX + differenceInY * differenceInY) <= 3);
    return Math.sqrt(differenceInX * differenceInX + differenceInY * differenceInY) <= 3;
}

// base url:
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=<NEXTPAGE>&key=<APIKEY>
async function nextEstablishmentPages(pagetoken, nearbyEstablishments){
    var oogaboogacaching = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${key}&pagetoken=${pagetoken}&tricktostopcachingbynathan=${oogaboogacaching}`;
    console.log("Calling next query with pagetoken= "+pagetoken);
    var nextPageToken = ""
    const response = await axios.get(url).then(successHandler()).catch(errorHandler(url));
    
    console.log(response.data);

    // If we have multiple pages, I need to store the token for the next page
    if (response.data.next_page_token){
        nextPageToken = response.data.next_page_token;
    }
    
    console.log(response.data.results.length);
    // push all search results into return array
    for (let i in response.data.results) {
        var elat = response.data.results[i].geometry.location.lat;
        var elon = response.data.results[i].geometry.location.lng;
        var name = response.data.results[i].name;

        // If the coordinate is not inside the circle we just skip it
        if(!isEstablishmentInsideCircleRadius( {lat:latitude, lon:longitude}, {lat:elat, lon:elon}) ){
            console.log(name);
            continue;
        }

        var rating = "-";

        if(response.data.results[i].rating)
            rating = "" + response.data.results[i].rating;

        var address = response.data.results[i].vicinity;
        var open = "Unknown";

        if(response.data.results[i].opening_hours && response.data.results[i].opening_hours.open_now)
            open = response.data.results[i].opening_hours.open_now;

        var type = "Unknown";
        if(response.data.results[i].types.length > 0)
            type = response.data.results[i].types[0];
        
        var establishmentObject = {name:name, rating:rating, address:address, latitude:elat, longitude:elon, openNow:open, type:type};
        nearbyEstablishments.push(establishmentObject);
    }

    if (nextPageToken === ""){
        return nearbyEstablishments;
    }
    else{
        var finalEstablishmentList = await nextEstablishmentPages(nextPageToken, nearbyEstablishments);
        return finalEstablishmentList;
    }

}


async function getEstablishments(latitude, longitude, filter, radius){
    var nearbyEstablishments = [];
    var nextPageToken = "";

    if(!filter || filter === ""){
        filter = ""
    }
    else{
        filter = "&type="+filter;
    }
    console.log("Filter str: "+filter);


    var snapshot = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${key}${filter}`
    );
    
    console.log("First request token: "+snapshot.data.next_page_token);
    // If we have multiple pages, I need to store the token for the next page
    if (snapshot.data.next_page_token){
        nextPageToken = snapshot.data.next_page_token;
        console.log(nextPageToken);
    }

    // push all search results into return array
    for (let i in snapshot.data.results) {
        var elat = snapshot.data.results[i].geometry.location.lat;
        var elon = snapshot.data.results[i].geometry.location.lng;
        var name = snapshot.data.results[i].name;

        // If the coordinate is not inside the circle we just skip it
        if(!isEstablishmentInsideCircleRadius( {lat:latitude, lon:longitude}, {lat:elat, lon:elon}) ){
            console.log(name);
            continue;
        }

        var rating = "-";

        if(snapshot.data.results[i].rating)
            rating = "" + snapshot.data.results[i].rating;

        var address = snapshot.data.results[i].vicinity;

        var open = "Unknown";

        if(snapshot.data.results[i].opening_hours && snapshot.data.results[i].opening_hours.open_now)
            open = snapshot.data.results[i].opening_hours.open_now;

        var type = "Unknown";
        if(snapshot.data.results[i].types.length > 0)
            type = snapshot.data.results[i].types[0];
        
        var establishmentObject = {name:name, rating:rating, address:address, latitude:elat, longitude:elon, openNow:open, type:type};
        nearbyEstablishments.push(establishmentObject);
    }

    if (nextPageToken === ""){
        return nearbyEstablishments;
    }
    else{
        var finalEstablishmentList = await nextEstablishmentPages(nextPageToken, nearbyEstablishments);
        return finalEstablishmentList;
    }
}

async function onlyGetInterestingEstablishments(latitude, longitude, radius){
    var typesOfInterest = ['restaurant', 'store', 'shopping_mall', 'movie_theater', 'cafe']
    var nearbyEstablishments = [];

    for ( let i = 0; i < typesOfInterest.length; i++){
        var filter = "&type="+typesOfInterest[i];
        console.log(filter);
        var snapshot = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&key=${key}${filter}`
        );
        
        for (let i in snapshot.data.results) {
            var elat = snapshot.data.results[i].geometry.location.lat;
            var elon = snapshot.data.results[i].geometry.location.lng;

            // If the coordinate is not inside the circle we just skip it
            if(!isEstablishmentInsideCircleRadius( {lat:latitude, lon:longitude}, {lat:elat, lon:elon}) ){
                continue;
            }

            var name = snapshot.data.results[i].name;
            var rating = "-";
    
            if(snapshot.data.results[i].rating)
                rating = "" + snapshot.data.results[i].rating;
    
            var address = snapshot.data.results[i].vicinity;

    
            var open = "Unknown";
    
            if(snapshot.data.results[i].opening_hours && snapshot.data.results[i].opening_hours.open_now)
                open = snapshot.data.results[i].opening_hours.open_now;
    
            var type = "Unknown";
            if(snapshot.data.results[i].types.length > 0)
                type = snapshot.data.results[i].types[0];
            
            var establishmentObject = {name:name, rating:rating, address:address, latitude:elat, longitude:elon, openNow:open, type:type};
            nearbyEstablishments.push(establishmentObject);
        }
    }
    return nearbyEstablishments;
}



/* ================= */
/*   API ENDPOINTS   */
/* ================= */

// latitude, longitude of the MIDPOINT, filters
router.post('/getestablishments', async (req, res, next) => {
    const {latitude, longitude, filters} = req.body;
    var allEstablishments = []
    var radius = 3000; // **in meters**
    var status = 200;
    var error = '';
    console.log(key);

    if (!checkParameters([latitude, longitude])) {
        error = 'Incorrect parameters';
        status = 400;
    }
    if (filters === ""){
        allEstablishments = await onlyGetInterestingEstablishments(latitude, longitude, radius);
    }
    else {
        allEstablishments = await getEstablishments(latitude, longitude, filters, radius);
    }

    var ret = { establishments: allEstablishments, error: error};
    res.status(status).json(ret);
});

module.exports = router;