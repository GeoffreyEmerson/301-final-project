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
});

// A POST route to Create new topics
// .post('/', function(req,res){
//   var topic = req.body;
//   Event.create(topic, function(err,topic){
//     if (err) {
//       return res.status(503).json({err: err.message, call: 'POST /topics'});
//     }
//     res.json({'topic':topic, message: 'Event Created'});
//   });
// })
//
// // A GET route with eventHash argument to get event data
// .get('/:hashArg',function(req,res) {
//   var hashArg = req.params.hashArg;
//   Event.findOne({hash: hashArg}, function(err,events){
//     if (err){
//       console.log(err);
//       return res.status(503).json({message: err.message, call: 'GET /events/:eventHash'});
//     }
//     res.json({events: events});
//   });
// })
//
// // A PUT route to update existing entries. Essentially only for a name change.
// .put('/:hashArg',function(req,res) {
//   var hashArg = req.params.hashArg;
//   Event.findOne({hash: hashArg}, function(err,event){
//     event.name = req.body.name; // Make the change...
//     event.save(function(err) {  // Then save the change.
//       if (err){
//         console.log(err);
//         return res.status(503).json({message: err.message, call: 'PUT /events/:eventHash'});
//       }
//     });
//     res.json({event: event}); // Puts JSON in the response object.
//   });
// })
//
// // A DELETE route to delete events by eventHash.
// .delete('/:hashArg',function(req,res) {
//   var hashArg = req.params.hashArg;
//   Event.findOne({hash: hashArg}, function(err,event){
//     event.remove(function(err) {
//       if (err){
//         console.log(err);
//         return res.status(503).json({message: err.message, call: 'DELETE /events/:eventHash'});
//       }
//     });
//     res.send('Event deleted.');
//   });
// })
//
// // Extra: Delete event by ID with the /events/id/:id route.
// .delete('/id/:id',function(req,res) {
//   var id = req.params.id;
//   Event.findOne({_id: id}, function(err,event){
//     event.remove(function(err) {
//       if (err){
//         console.log(err);
//         return res.status(503).json({message: err.message, call: 'DELETE /events/id/:id'});
//       }
//     });
//     return res.send('Event deleted.');
//   });
// });

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
// });

module.exports = router;
