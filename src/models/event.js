var mongoose = require('mongoose');

//event.name
//event.hash

var eventSchema = new mongoose.Schema({
  name: String,
  hash: String,
  test: Boolean
});

var model = mongoose.model('Event', eventSchema);

module.exports = model;
