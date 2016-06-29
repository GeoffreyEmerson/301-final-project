'use strict';

var express = require('express');
var crypto = require('crypto');

var Attend = require('../models/attend'); // Start with a Capital for models.
var Event = require('../models/event');
var Topic = require('../models/topic');
var User = require('../models/user');
var Vote = require('../models/vote');

var router = express.Router();

/*------------------
--  Event routes  --
------------------*/

router.get('/events',function(req,res) {
  Event.find({}, function(err,events){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /events'});
    }
    res.json({events: events});
  });
});

// A POST route to Create new entries
router.post('/events', function(req,res){
  var event = req.body;
  event.hash = crypto.randomBytes(20).toString('hex');
  console.log('POST /event:',event);
  Event.create(event, function(err,event){
    if (err) {
      return res.status(503).json({err: err.message});
    }
    res.json({'event':event, message: 'Event Created'});
  });
});

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to delete entries

router.get('/topics',function(req,res) {
  Topic.find({}, function(err,topics){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /topics'});
    }
    res.json({topics: topics});
  });
});

router.get('/topics/:name/:hash',function(req,res) {
  var name = req.params.name;
  var hash = req.params.hash;
  Topic.findOne({name: name, 'eventHash': hash}, '_id', function(err,id){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /topics/' + hash});
    }
    res.json({eventHash: id});
  });
});

router.get('/users',function(req,res) {
  User.find({}, function(err,users){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /users'});
    }
    res.json({users: users});
  });
});

router.get('/attends',function(req,res) {
  Attend.find({}, function(err,attends){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /attends'});
    }
    res.json({attends: attends});
  });
});

router.get('/votes',function(req,res) {
  Vote.find({}, function(err,votes){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /votes'});
    }
    res.json({votes: votes});
  });
});

module.exports = router;
