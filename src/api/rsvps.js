'use strict';

var express = require('express');

var Rsvp = require('../models/rsvp');
// var Event = require('../models/event'); // Might be Needed for certain searches

var router = express.Router();

/*-----------------
--  RSVP routes  --
-----------------*/

// A GET route to list all RSVPs. Probably won't be needed for final version.
router
.get('/',function(req,res) {
  Rsvp.find({}, function(err,rsvps){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /rsvps'});
    }
    return res.json({rsvps: rsvps});
  });
})

// A POST route to Create new RSVP entries
.post('/', function(req,res){
  var newRsvp = {
    user: req.body.userId,
    event: req.body.eventId
  };
  // Search for existing RSVP for this user and event
  Rsvp.findOne(newRsvp, function(err,rsvp){
    if (rsvp) {
      // If Rsvp record exists, update vote calculations
      rsvp.status++;
      if(rsvp.status == 3) rsvp.status = -1;
      rsvp.save(function(err) {  // Then save the change.
        if (err){
          console.log(err);
          return res.status(503).json({message: err.message, call: 'saving incremented rsvp status'});
        }
      });
      return res.json({'rsvp':rsvp});
    } else {
      // If no Rsvp record exists yet, create it.
      newRsvp.status = 1;
      Rsvp.create(newRsvp, function(err,rsvp){
        if (err) {
          console.log(err);
          return res.status(503).json({err: err.message, call: 'POST /rsvps'});
        }
        res.json({'rsvp':rsvp, message: 'New RSVP Created'});
      });
    };
  });
})

// A GET route with eventId argument to get rsvp list for that event
.get('/:eventId',function(req,res) {
  var event = req.params.eventId;
  Rsvp.find({event: event})
  .populate('user event')
  .exec(function(err,rsvps){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /rsvps/:eventId'});
    }
    res.json({rsvps: rsvps});
  });
})

// A GET route for checking a specific user's rsvp status
.get('/:eventIdArg/:userIdArg', function(req,res) {
  var eventIdArg = req.params.eventIdArg;
  var userIdArg = req.params.userIdArg;
  Rsvp.findOne({user:userIdArg,event: eventIdArg})
  .exec(function(err,rsvp){
    if(!err){
      if(rsvp) {
        res.json({'status':rsvp.status});
      } else {
        res.json({'status':0});
      };
    } else {
      console.log(err);
      return res.status(503).json({err: err.message, call: 'GET /rsvps/:eventId/:userId'});
    }
  });
})

// A PUT route to update existing entries. Changing RSVP status will need this.
.put('/',function(req,res) {
  var userIdArg = req.body.userId;
  var eventIdArg = req.body.eventId;
  Rsvp.findOne({user:userIdArg, event:eventIdArg}, function(err,rsvp){
    if (rsvp) {
      rsvp.status = req.body.status; // Make the change...
      rsvp.save(function(err) {  // Then save the change.
        if (err){
          console.log(err);
          return res.status(503).json({message: err.message, call: 'PUT /rsvp'});
        }
      });
      return res.json({rsvp: rsvp}); // Puts JSON in the response object.
    } else {
      return res.send('RSVP not found.');
    };
  });
})

// A DELETE route to delete rsvp by id.
.delete('/:id',function(req,res) {
  var idArg = req.params.id;
  Rsvp.findOne({_id: idArg}, function(err,rsvp){
    rsvp.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /rsvps/:id'});
      }
    });
    return res.send('RSVP deleted.');
  });
})

// end of route chain
;

module.exports = router;
