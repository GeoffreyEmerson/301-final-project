var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  name: String, // "2016-07-04 18:00:00"
  userHash: String, // "ajhbj5bkqhvq5h4kq5"
  topicId: String, // "hj2v54j3d2hv6jh2v6"
  weight: Number, // 2
  date: String,
  xValue: String
});

var model = mongoose.model('Vote', voteSchema);

module.exports = model;
