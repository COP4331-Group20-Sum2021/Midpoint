const express = require('express');
const axios = require('axios');
const { admin, db } = require('../auth/firebase');
const key = process.env.GOOGLE_API_KEY;
const router = express.Router();

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
    return Math.sqrt(differenceInX * differenceInX + differenceInY * differenceInY);
}

// base url:
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=<NEXTPAGE>&key=<APIKEY>
async function nextEstablishmentPages(pagetoken, nearbyEstablishments){
    console.log("Calling next query with pagetoken= "+pagetoken);
    var nextPageToken = ""
    var snapshot = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${pagetoken}&key=${key}`
    );

    // If we have multiple pages, I need to store the token for the next page
    if (snapshot.data.next_page_token){
        nextPageToken = snapshot.data.next_page_token;
    }

    // push all search results into return array
    for (let i in snapshot.data.results) {
        var name = snapshot.data.results[i].name;
        var rating = "-";

        if(snapshot.data.results[i].rating)
            rating = "" + snapshot.data.results[i].rating;

        var address = snapshot.data.results[i].vicinity;
        var elat = snapshot.data.results[i].geometry.location.lat;
        var elon = snapshot.data.results[i].geometry.location.lng;

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
        var name = snapshot.data.results[i].name;
        var rating = "-";

        if(snapshot.data.results[i].rating)
            rating = "" + snapshot.data.results[i].rating;

        var address = snapshot.data.results[i].vicinity;
        var elat = snapshot.data.results[i].geometry.location.lat;
        var elon = snapshot.data.results[i].geometry.location.lng;

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
    else {
        allEstablishments = await getEstablishments(latitude, longitude, filters, radius);
    }

    var ret = { establishments: allEstablishments, error: error};
    res.status(status).json(ret);
});

module.exports = router;