var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String, // "Bob"
  userHash: String // "3hkf67dkh5f73d5kh3f6"
  // __id: String
});

var model = mongoose.model('User', userSchema);

module.exports = model;
