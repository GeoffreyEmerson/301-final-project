var mongoose = require('mongoose');

var rsvpSchema = new mongoose.Schema({
  rsvp: Boolean, // true
  userHash: String, // "ajhbj5bkqhvq5h4kq5"
  eventHash: String // "26jg64j1v8gdj6g28d"
});

var model = mongoose.model('Rsvp', rsvpSchema);

module.exports = model;
