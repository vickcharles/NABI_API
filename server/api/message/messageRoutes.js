var _ = require('lodash');
var messageRouter = require('express').Router();

var messages = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

messageRouter.param('id', function(req, res, next, id) {
  var message = _.find(messages, {id: id})
  if (message) {
    req.message = message;
    next();
  } else {
    res.send();
  }
});

messageRouter.route('/')
    .get(function(req, res){
        res.json(messages);
    })
    .post(updateId, function(req, res) {
        var message = req.body;
        messages.push(message);
        res.json(message);
    });

messageRouter.route('/:id')
    .get(function(req, res){
        var message = req.message;
        res.json(message || {});
    })
    .delete(function(req, res) {
        var message = _.findIndex(messages, {id: req.params.id});
        messages.splice(message, 1);
        res.json(req.message);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var message = _.findIndex(messages, {id: req.params.id});
        if (!messages[message]) {
            res.send();
        } else {
            var updatedmessage = _.assign(messages[message], update);
            res.json(updatedmessage);
        }
    });

module.exports = messageRouter;