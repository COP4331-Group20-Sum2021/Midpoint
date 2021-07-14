// express
const express = require('express');
require('dotenv').config();

// Firebase
const { admin, db } = require('./auth/firebase');
const cors = require('cors');
const path = require('path');

// Init express app and set the port
const app = express();
const PORT = process.env.PORT || 5000;
app.set('port', (PORT));

// TODO properly initialize CORS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// on heroku, set to statically serve the react (TODO is this how we want to do this?)
if (process.env.NODE_ENV === 'production') {  
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'web', 'build')));
    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));  
    });
}

// api routes
let locatonAPI = require('./api/locationapi');
app.use('/api', locatonAPI);
let groupCRUD = require('./api/groupCRUD');
app.use('/api', groupCRUD);

app.listen(PORT, () => {console.log('Server listening on port ' + PORT);});