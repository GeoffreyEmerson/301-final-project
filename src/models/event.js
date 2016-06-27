var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String, // "Bob's Shindig"
  hash: String // "3JHG63JKH6G3J4HG6"
  // _id: "577079c2583eab030090ae97"
});

var model = mongoose.model('Event', eventSchema);

module.exports = model;
