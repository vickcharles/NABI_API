var _ = require('lodash');
var requestRouter = require('express').Router();

var requests = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

requestRouter.param('id', function(req, res, next, id) {
  var request = _.find(requests, {id: id})
  if (request) {
    req.request = request;
    next();
  } else {
    res.send();
  }
});

requestRouter.route('/')
    .get(function(req, res){
        res.json(requests);
    })
    .post(updateId, function(req, res) {
        var request = req.body;
        requests.push(request);
        res.json(request);
    });

requestRouter.route('/:id')
    .get(function(req, res){
        var request = req.request;
        res.json(request || {});
    })
    .delete(function(req, res) {
        var request = _.findIndex(requests, {id: req.params.id});
        requests.splice(request, 1);
        res.json(req.request);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var request = _.findIndex(requests, {id: req.params.id});
        if (!requests[request]) {
            res.send();
        } else {
            var updatedrequest = _.assign(requests[request], update);
            res.json(updatedrequest);
        }
    });

module.exports = requestRouter;