const _ = require('lodash');
const userRouter = require('express').Router();

const User = require("./userModel");
const constants = require('./constants');

userRouter.route('/')
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) return res.status(500).send(err);
      return res.json(users);
    });
  })
  .post((req, res, next) => {
    var user = new User(req.body);
    user.save((err)=> {
      if (err) {
        if (err.code === 11000) {
          const error = new Error(constants.duplicateEmailText);
          error.code = 409;
          next(error);
        }
        next(err);
      } else {
        res.status(201).send(user);
      }
    });
  });

  // TODO: Fix not using mongoose schema to update file, relies on a users
  // array posibly a memory array using loadash but not a persistent
userRouter.route('/:id')
  .get(function(req, res){
    User.findById(
      req.params.id,
      {"password":0}, // removes password from returned data
      function(err, _user){
        if(err) return res.status(409).json({error:err})
        return res.json(_user);
      }
    );
  })
  .delete(function(req, res) {
    User.findByIdAndDelete(
      req.params.id,
      function(err, delResp){
        if(err) return res.status(409).json({"error":err});
        return res.json(delResp);
      }
    );
  })
  .put(function(req, res) {
    const update = req.body;
    if (update.id) {
      delete update.id
    }
    User.findByIdAndUpdate(
      req.params.id,
      {"$set": update },
      {new: true},
      function( err, _user ){
        if ( err ) return res.status(409).json({"error":err});
        return res.json( _user );
      }
    );
  });

module.exports = userRouter;
