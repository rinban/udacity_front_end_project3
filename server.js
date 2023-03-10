// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// port for listening
const port = 8000;
// create express server using the listen method
const server = app.listen(port,listening);

// will show on terminal
function listening(){
    console.log('server is running');
    console.log(`running on localhost: ${port}`);
}

// GET server route
app.get('/allData',function(req,res){
    res.send(projectData);
});

// Post server route
app.post('/addData', postData)

function postData (req,res){

    projectData = {
        temp: req.body.temp,
        date : req.body.date,
        feel: req.body.feel
    };
    
    res.send(projectData);
}
