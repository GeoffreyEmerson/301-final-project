// 'use strict';
//
// var express = require('express');
// var crypto = require('crypto'); // Needed for generating random hashes
//
// // var Event = require('../models/event'); // Start with a Capital for models.
// var Rsvp = require('../models/rsvp');
// var Topic = require('../models/topic');
// var User = require('../models/user');
// var Vote = require('../models/vote');
//
// var router = express.Router();
//
// // /*------------------
// // --  Event routes  --
// // ------------------*/
// //
// // router.get('/events',function(req,res) {
// //   Event.find({}, function(err,events){
// //     if (err){
// //       console.log(err);
// //       return res.status(503).json({message: err.message, call: 'GET /events'});
// //     }
// //     res.json({events: events});
// //   });
// // });
// //
// // // A POST route to Create new entries
// // router.post('/events', function(req,res){
// //   var event = req.body;
// //   event.hash = crypto.randomBytes(20).toString('hex');
// //   console.log('POST /event:',event);
// //   Event.create(event, function(err,event){
// //     if (err) {
// //       return res.status(503).json({err: err.message, call: 'POST /events'});
// //     }
// //     res.json({'event':event, message: 'Event Created'});
// //   });
// // });
// //
// // // A GET route with eventHash argument to get event data
// // router.get('/events/:hashArg',function(req,res) {
// //   var hashArg = req.params.hashArg;
// //   Event.findOne({hash: hashArg}, function(err,events){
// //     if (err){
// //       console.log(err);
// //       return res.status(503).json({message: err.message, call: 'GET /events/:eventHash'});
// //     }
// //     res.json({events: events});
// //   });
// // });
// //
// // // A PUT route to update existing entries. Essentially only for a name change.
// // router.put('/events/:hashArg',function(req,res) {
// //   var hashArg = req.params.hashArg;
// //   Event.findOne({hash: hashArg}, function(err,event){
// //     event.name = req.body.name; // Make the change...
// //     event.save(function(err) {  // Then save the change.
// //       if (err){
// //         console.log(err);
// //         return res.status(503).json({message: err.message, call: 'PUT /events/:eventHash'});
// //       }
// //     });
// //     res.json({event: event}); // Puts JSON in the response object.
// //   });
// // });
// //
// // // A DELETE route to delete events by eventHash.
// // router.delete('/events/:hashArg',function(req,res) {
// //   var hashArg = req.params.hashArg;
// //   Event.findOne({hash: hashArg}, function(err,event){
// //     event.remove(function(err) {
// //       if (err){
// //         console.log(err);
// //         return res.status(503).json({message: err.message, call: 'DELETE /events/:eventHash'});
// //       }
// //     });
// //     res.send('Event deleted.');
// //   });
// // });
// //
// // // Extra: Delete event by ID with the /events/id/:id route.
// // router.delete('/events/id/:id',function(req,res) {
// //   var id = req.params.id;
// //   Event.findOne({_id: id}, function(err,event){
// //     event.remove(function(err) {
// //       if (err){
// //         console.log(err);
// //         return res.status(503).json({message: err.message, call: 'DELETE /events/id/:id'});
// //       }
// //     });
// //     return res.send('Event deleted.');
// //   });
// // });
//
// /*-----------------
// --  RSVP routes  --
// -----------------*/
//
// // A GET route to list all RSVPs. Probably won't be needed for final version.
// router.get('/rsvps',function(req,res) {
//   Rsvp.find({}, function(err,rsvps){
//     if (err){
//       console.log(err);
//       return res.status(503).json({message: err.message, call: 'GET /rsvps'});
//     }
//     return res.json({rsvps: rsvps});
//   });
// });
//
// // A POST route to Create new RSVP entries
// router.post('/rsvps', function(req,res){
//   var rsvp = req.body;
//   console.log('POST /rsvp:',rsvp);
//   Rsvp.create(rsvp, function(err,rsvp){
//     if (err) {
//       return res.status(503).json({err: err.message, call: 'POST /rsvps'});
//     }
//     res.json({'rsvp':rsvp, message: 'RSVP Created'});
//   });
// });
//
// // A GET route with eventHash argument to get event data
// router.get('/rsvps/:hashArg',function(req,res) {
//   var hashArg = req.params.hashArg;
//   Event.findOne({hash: hashArg}, function(err,rsvps){
//     if (err){
//       console.log(err);
//       return res.status(503).json({message: err.message, call: 'GET /rsvps/:eventHash'});
//     }
//     res.json({rsvps: rsvps});
//   });
// });
//
// /*------------------
// --  Topic routes  --
// ------------------*/
//
// router.get('/topics',function(req,res) {
//   Topic.find({}, function(err,topics){
//     if (err){
//       console.log(err);
//       res.status(503).json({message: err.message, call: 'GET /topics'});
//     }
//     res.json({topics: topics});
//   });
// });
//
// // // I think I wrote this while trying to implement the seeds
// // // A GET route that returns an topicId when supplied with a Topic name and eventHash
// // router.get('/topics/:topicNameArg/:eventHashArg',function(req,res) {
// //   var topicNameArg = req.params.topicNameArg;
// //   var eventHashArg = req.params.eventHashArg;
// //   Topic.findOne({name: topicNameArg, eventHash: eventHashArg}, '_id', function(err,id){
// //     if (err){
// //       console.log(err);
// //       res.status(503).json({message: err.message, call: 'GET /topics/' + hash});
// //     }
// //     res.json({topicId: id});
// //   });
// // });
//
// /*-----------------
// --  User routes  --
// -----------------*/
//
// router.get('/users',function(req,res) {
//   User.find({}, function(err,users){
//     if (err){
//       console.log(err);
//       res.status(503).json({message: err.message, call: 'GET /users'});
//     }
//     res.json({users: users});
//   });
// });
//
// /*-----------------
// --  Vote routes  --
// -----------------*/
//
// router.get('/votes',function(req,res) {
//   Vote.find({}, function(err,votes){
//     if (err){
//       console.log(err);
//       res.status(503).json({message: err.message, call: 'GET /votes'});
//     }
//     res.json({votes: votes});
//   });
// });
//
// module.exports = router;
