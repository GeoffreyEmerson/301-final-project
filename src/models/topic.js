var mongoose = require('mongoose');

//todo.name
//todo.completed

var topicSchema = new mongoose.Schema({
  name: String, // Pizza Topings
  description: String, // No Anchovies Please
  eventHash: String // ajhbj5bkqhvq5h4kq5
  // __id: String
});

var model = mongoose.model('Topic', topicSchema);

module.exports = model;
