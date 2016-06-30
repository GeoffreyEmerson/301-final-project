var mongoose = require('mongoose');

// Set our mongo sb's location. It's either stored in an environment variable
//  (such as on Heroku) or it's localhose.
var mongoUrl = process.env.MONGODB_URI || 'mongodb://curt:convoke@ds011860.mlab.com:11860/convoke';

// Start the db connection
mongoose.connect(mongoUrl, function(err) {
  if (err) {
    console.log('Failed connecting to Mongodb!');
  } else {
    console.log('Successfully connected to Mongodb!');
  }
});
