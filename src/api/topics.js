'use strict';

var express = require('express');

var Topic = require('../models/topic'); // Start with a Capital for models.

var router = express.Router();

/*------------------
--  Topic routes  --
------------------*/

router
.get('/',function(req,res) {
  Topic.find({}, function(err,topics){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /topics'});
    }
    res.json({topics: topics});
  });
})

// A POST route to Create new topics
.post('/', function(req,res){
  var topic = req.body;
  Topic.create(topic, function(err,topic){
    if (err) {
      console.log(err);
      return res.status(503).json({err: err.message, call: 'POST /topics'});
    }
    res.json({'topic':topic, message: 'Topic Created'});
  });
})

// A GET route with ID argument to get data on a specific topic
.get('/:id',function(req,res) {
  var idArg = req.params.id;
  Topic.findOne({_id: idArg}, function(err,topic){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /topics/:id'});
    }
    res.json({topic: topic});
  });
})

// A PUT route to update existing entries. Essentially only for a name or description change.
.put('/:id',function(req,res) {
  var idArg = req.params.id;
  Topic.findOne({_id: idArg}, function(err,topic){
    topic.name = req.body.name; // Make the change...
    topic.description = req.body.description; // Make the change...
    topic.save(function(err) {  // Then save the change.
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'PUT /topics/:id'});
      }
    });
    res.json({topic: topic}); // Puts JSON in the response object.
  });
})

// A DELETE route to delete topic by ID.
.delete('/:id',function(req,res) {
  var idArg = req.params.id;
  Topic.findOne({_id: idArg}, function(err,topic){
    topic.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /topics/:id'});
      }
    });
    res.send('Topic deleted.');
  });
})

// // I think I wrote this while trying to implement the seeds
// // A GET route that returns an topicId when supplied with a Topic name and eventHash
// router.get('/topics/:topicNameArg/:eventHashArg',function(req,res) {
//   var topicNameArg = req.params.topicNameArg;
//   var eventHashArg = req.params.eventHashArg;
//   Topic.findOne({name: topicNameArg, eventHash: eventHashArg}, '_id', function(err,id){
//     if (err){
//       console.log(err);
//       res.status(503).json({message: err.message, call: 'GET /topics/' + hash});
//     }
//     res.json({topicId: id});
//   });
// })

;

module.exports = router;
