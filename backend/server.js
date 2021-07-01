const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000; 

const app = express();
app.set('port', (process.env.PORT || 5000));

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {  console.log('Server listening on port ' + PORT);});