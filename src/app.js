var express = require('express');
var bodyParser = require('body-parser');

var events = require('./api/events');
var rsvps = require('./api/rsvps');
var topics = require('./api/topics');
var users = require('./api/users');
var votes = require('./api/votes');

var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the port if it is set in the environment (such as on Heroku) or use
//  port 3000 otherwise (such as a dev environment).
app.set('port', (process.env.PORT || 3000));

// Establish the Mongo db connection
require('./database');

// Populate the db with example data
// require('./seed');

// Express: Allow all files in the "public" directory to be loaded directly.
app.use('/',express.static('public'));

// Send all requests to the "api" directories to the API router.
app.use('/api/events', events);
app.use('/api/rsvps', rsvps);
app.use('/api/topics', topics);
app.use('/api/users', users);
app.use('/api/votes', votes);

// Catch all unspecified requests and send them to the page.js router in /public.
app.get('*', function(req, res){
  res.sendFile('/public/index.html',{root:__dirname + '/..'});
});

// Start the Express listener, which catches URLs sent to our app.
app.listen(app.get('port'), function() {
  console.log('The server is running on port', app.get('port'));
});
