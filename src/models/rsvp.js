var mongoose = require('mongoose');

var rsvpSchema = new mongoose.Schema({
  status: Number, // -1 = Nope, 0 = Unanswered, 1 = Maybe, 2 = Yep
  userHash: String, // "ajhbj5bkqhvq5h4kq5"
  eventHash: String // "26jg64j1v8gdj6g28d"
});

var model = mongoose.model('Rsvp', rsvpSchema);

module.exports = model;
