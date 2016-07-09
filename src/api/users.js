'use strict';

var express = require('express');
var crypto = require('crypto'); // Needed for generating random hashes

var User = require('../models/user'); // Start with a Capital for models.

var router = express.Router();

/*-----------------
--  User routes  --
-----------------*/

router
.get('/',function(req,res) {
  User.find({}, function(err,users){
    if (err){
      console.log(err);
      res.status(503).json({message: err.message, call: 'GET /users'});
    }
    res.json({users: users});
  });
})

// A POST route to Create a new user
.post('/', function(req,res){
  var user = req.body;
  User.create(user, function(err,user){
    if (err) {
      console.log(err);
      return res.status(503).json({err: err.message, call: 'POST /users'});
    }
    res.json({'user':user, message: 'User Created'});
  });
})

// A GET route with ID argument to get data on a specific user
.get('/:userHash',function(req,res) {
  var userHashArg = req.params.userHash;
  User.findOne({hash: userHashArg}, function(err,user){
    if (err){
      console.log(err);
      return res.status(503).json({message: err.message, call: 'GET /users/:userHash'});
    }
    res.json({user: user});
  });
})

// A PUT route to update existing entries. Name, email, passHash changes.
.put('/:userHash',function(req,res) {
  var userHashArg = req.params.userHash;
  User.findOne({hash: userHashArg}, function(err,user){
    user.name = req.body.name; // Make the change...
    user.userEmail = req.body.userEmail; // Make the change...
    user.passHash = req.body.passHash; // Make the change...
    user.save(function(err) {  // Then save the change.
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'PUT /users/:userHash', body:req.body});
      }
    });
    res.json({user: user}); // Puts JSON in the response object.
  });
})

// A DELETE route to delete user by ID.
.delete('/:userHash',function(req,res) {
  var userHashArg = req.params.userHash;
  User.findOne({hash: userHashArg}, function(err,user){
    user.remove(function(err) {
      if (err){
        console.log(err);
        return res.status(503).json({message: err.message, call: 'DELETE /users/:userHash'});
      }
    });
    res.send('User deleted.');
  });
})

;

module.exports = router;
