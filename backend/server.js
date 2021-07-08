const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000; 

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'production') {  
    // Set static folder
    app.use(express.static(path.join(__dirname, '..', 'web', 'build')));
    app.get('*', (req, res) =>  {
        res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));  
    });
}

app.listen(PORT, () => {console.log('Server listening on port ' + PORT);});