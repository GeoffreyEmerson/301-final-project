var mongoose = require('mongoose');

var rsvpSchema = new mongoose.Schema({
  status: Number, // -1 = Nope, 0 = Unanswered, 1 = Maybe, 2 = Yep
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event:  {type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

var model = mongoose.model('Rsvp', rsvpSchema);

module.exports = model;
