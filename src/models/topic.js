var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
  name: String, // "Pizza Topings"
  description: String, // "No Anchovies Please"
  event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

var model = mongoose.model('Topic', topicSchema);

module.exports = model;
