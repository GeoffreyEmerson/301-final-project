var mongoose = require('mongoose');

var attendingSchema = new mongoose.Schema({
  userHash: String, // "ajhbj5bkqhvq5h4kq5"
  eventHash: String // "26jg64j1v8gdj6g28d"
});

var model = mongoose.model('Attending', attendingSchema);

module.exports = model;
