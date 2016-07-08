'use strict';

var express = require('express');
var crypto = require('crypto'); // Needed for generating random hashes

var Event = require('../models/event'); // Start with a Capital for models.

var router = express.Router();

/*------------------
--  Event routes  --
------------------*/

router
.get('/',function(req,res) {
  Event.find({}, function(err,events){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /events'});
    }
    res.json({events: events});
  });
})

// A POST route to Create new entries
.post('/', function(req,res){
  var event = req.body;
  event.hash = crypto.randomBytes(20).toString('hex');
  Event.create(event, function(err,event){
    if (err) {
      return res.status(503).json({err: err.message, call: 'POST /events'});
    }
    res.json({'event':event, message: 'Event Created'});
  });
})

// A GET route with eventHash argument to get event data
.get('/:hashArg',function(req,res) {
  var hashArg = req.params.hashArg;
  Event.findOne({hash: hashArg}, function(err,event){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /events/:eventHash'});
    }
    res.json({event: event});
  });
})

// A PUT route to update existing entries.
.put('/:hashArg',function(req,res) {
  var hashArg = req.params.hashArg;
  Event.findOne({hash: hashArg}, function(err,event){
    if (!err) {
      Object.keys(req.body).forEach(function(key) {
        event[key] = req.body[key]; // Make the changes...
      });
      event.save(function(err) {  // Then save the change.
        if (err){
          console.log(err);
          return res.status(503).json({message: err.message, call: 'PUT /events/:eventHash'});
        } else {
          res.json({event: event}); // Puts JSON in the response object.
        };
      });
    } else {
      console.log(err);
      return res.status(503).json({message: err.message, call: 'PUT /events/:eventHash'});
    }
  });
})

// A DELETE route to delete events by eventHash.
.delete('/:hashArg',function(req,res) {
  var hashArg = req.params.hashArg;
  Event.findOne({hash: hashArg}, function(err,event){
    event.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /events/:eventHash'});
      }
    });
    res.send('Event deleted.');
  });
})

// Extra: Delete event by ID with the /events/id/:id route.
.delete('/id/:id',function(req,res) {
  var id = req.params.id;
  Event.findOne({_id: id}, function(err,event){
    event.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /events/id/:id'});
      }
    });
    return res.send('Event deleted.');
  });
});

module.exports = router;
