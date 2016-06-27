var mongoose = require('mongoose');

//event.name
//event.hash

var eventSchema = new mongoose.Schema({
  name: String, // Bob's Shindig
  hash: String // 3JHG63JKH6G3J4HG6
});

var model = mongoose.model('Event', eventSchema);

module.exports = model;
