var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  name: String, // "2016-07-04 18:00:00"
  user:  {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topic:  {type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  weight: Number, // 2
  date: String,
  xValue: String
});

var model = mongoose.model('Vote', voteSchema);

module.exports = model;
