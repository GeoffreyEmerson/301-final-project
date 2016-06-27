var mongoose = require('mongoose');

//todo.name
//todo.completed

var userSchema = new mongoose.Schema({
  name: String,
  userHash: String
});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;
