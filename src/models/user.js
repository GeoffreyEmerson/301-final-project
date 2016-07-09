var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: String, // "Bob"
  hash: String, // "3hkf67dkh5f73d5kh3f6"
  email: String,
  passwordHash: String,  // TODO: Add email and login authentication
  skin: String // "Sky"
});

var model = mongoose.model('User', userSchema);

module.exports = model;
