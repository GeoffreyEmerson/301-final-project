var mongoose = require('mongoose');

var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/convoke';

mongoose.connect(mongoUrl, function(err) {
  if (err) {
    console.log('Failed connecting to Mongodb!');
  } else {
    console.log('Successfully connected to Mongodb!');
  }
});
