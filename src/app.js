var express = require('express');
var bodyParser = require('body-parser');
var router = require('./api');
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
require('./seed');

// Express: Allow all files in the "public" directory to be loaded directly.
app.use('/',express.static('public'));

// Send all requests to the "api" directory to the API router.
app.use('/api', router);

// Start the Express listener, which catches URLs sent to our app.
app.listen(app.get('port'), function() {
  console.log('The server is running on port', app.get('port'));
});
