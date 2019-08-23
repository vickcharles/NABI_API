var _ = require('lodash');
var parentRouter = require('express').Router();

var parents = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

parentRouter.param('id', function(req, res, next, id) {
  var parent = _.find(parents, {id: id})
  if (parent) {
    req.parent = parent;
    next();
  } else {
    res.send();
  }
});

parentRouter.route('/')
    .get(function(req, res){
        res.json(parents);
    })
    .post(updateId, function(req, res) {
        var parent = req.body;
        parents.push(parent);
        res.json(parent);
    });

parentRouter.route('/:id')
    .get(function(req, res){
        var parent = req.parent;
        res.json(parent || {});
    })
    .delete(function(req, res) {
        var parent = _.findIndex(parents, {id: req.params.id});
        parents.splice(parent, 1);
        res.json(req.parent);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var parent = _.findIndex(parents, {id: req.params.id});
        if (!parents[parent]) {
            res.send();
        } else {
            var updatedparent = _.assign(parents[parent], update);
            res.json(updatedparent);
        }
    });

module.exports = parentRouter;