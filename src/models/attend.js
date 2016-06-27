var mongoose = require('mongoose');

var attendSchema = new mongoose.Schema({
  attend: Boolean, // true
  userHash: String, // "ajhbj5bkqhvq5h4kq5"
  eventHash: String // "26jg64j1v8gdj6g28d"
});

var model = mongoose.model('Attend', attendSchema);

module.exports = model;
