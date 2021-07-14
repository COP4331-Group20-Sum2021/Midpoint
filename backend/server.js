// express
const express = require('express');

// Firebase
const { admin, db } = require('./auth/firebase');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

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
let locatonAPI = require('./locationapi');
app.use('/api', locatonAPI);

app.listen(PORT, () => {console.log('Server listening on port ' + PORT);});