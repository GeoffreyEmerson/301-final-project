var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  name: String, // "Bob's Shindig"
  hash: String, // "3JHG63JKH6G3J4HG6" // a URL safe hash that identifies the event
  organizer: [String], // ["2dhf5dyd6d83v63vxmv724"] // One or more user hashes
  skin: String // "Night"
  // _id: "577079c2583eab030090ae97"
});

var model = mongoose.model('Event', eventSchema);

module.exports = model;
