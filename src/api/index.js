'use strict';

var express = require('express');
var Event = require('../models/event'); // Capital for models.

var router = express.Router();

router.get('/events',function(req,res) {
  Event.find({}, function(err,events){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /events'});
    }
    res.json({events: events});
  });

});

// TODO: Add POST route to create new entries

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to delete entries

module.exports = router;
