'use strict';

var express = require('express');
var crypto = require('crypto'); // Needed for generating random hashes

var Vote = require('../models/vote'); // Start with a Capital for models.

var router = express.Router();

/*-----------------
--  Vote routes  --
-----------------*/

router
.get('/',function(req,res) {
  Vote.find({}, function(err,votes){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /votes'});
    }
    res.json({votes: votes});
  });
})

// A POST route to Create a new vote
.post('/', function(req,res){
  var vote = req.body;
  Vote.create(vote, function(err,vote){
    if (err) {
      return res.status(503).json({err: err.message, call: 'POST /votes'});
    }
    res.json({'vote':vote, message: 'Vote Created'});
  });
})

// A GET route with ID argument to get data on a specific vote
.get('/:id',function(req,res) {
  var idArg = req.params.id;
  Vote.findOne({_id: idArg}, function(err,vote){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /votes/:id'});
    }
    return res.json({vote: vote});
  });
})

// A PUT route to update existing entries. Name, email, passHash changes.
.put('/:id',function(req,res) {
  var idArg = req.params.id;
  Vote.findOne({_id: idArg}, function(err,vote){
    vote.name = req.body.name; // Make the change...
    vote.weight = req.body.weight; // Make the change...
    vote.save(function(err) {  // Then save the change.
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'PUT /votes/:id', body:req.body});
      }
    });
    return res.json({vote: vote}); // Puts JSON in the response object.
  });
})

// A DELETE route to delete vote by ID.
.delete('/:id',function(req,res) {
  var idArg = req.params.id;
  Vote.findOne({_id: idArg}, function(err,vote){
    vote.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /votes/:id'});
      }
    });
    return res.send('Vote deleted.');
  });
})

// url: '/api/votes',
// type: 'POST',
// data: {name: text, userHash: userHashArg, topicId: topicIdArg},

// name: String, // "2016-07-04 18:00:00"
// userHash: String, // "ajhbj5bkqhvq5h4kq5"
// topicId: String, // "hj2v54j3d2hv6jh2v6"
// weight: Number // 2

.post('/',function(req,res) {
  var voteText = req.body.name;
  var userHashArg = req.body.userHash;
  var topicIdArg = req.body.topicId;
  Vote.findOne({name:voteText,userHash:userHashArg,topicId:topicIdArg}, function(err,vote) {
    if(err) {
      console.log('New choice for this user. Default weight will be 1.');
      // TODO: Add new vote record.
    } else {
      console.log('Already chosen. Computing new weight.');
      // TODO: Computations go here
    }
  });
});

;

module.exports = router;
