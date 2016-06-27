var mongoose = require('mongoose');

//todo.name
//todo.completed

var voteSchema = new mongoose.Schema({
  name: String, // 2016-07-04 18:00:00
  userHash: String, // ajhbj5bkqhvq5h4kq5
  topicId: String, // hj2v54j2hv6jh2v6
  weight: Number // 2
});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;
