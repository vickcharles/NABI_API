var _ = require('lodash');
var applicationRouter = require('express').Router();

var applications = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

applicationRouter.param('id', function(req, res, next, id) {
  var application = _.find(applications, {id: id})
  if (application) {
    req.application = application;
    next();
  } else {
    res.send();
  }
});

applicationRouter.route('/')
    .get(function(req, res){
        res.json(applications);
    })
    .post(updateId, function(req, res) {
        var application = req.body;
        applications.push(application);
        res.json(application);
    });

applicationRouter.route('/:id')
    .get(function(req, res){
        var application = req.application;
        res.json(application || {});
    })
    .delete(function(req, res) {
        var application = _.findIndex(applications, {id: req.params.id});
        applications.splice(application, 1);
        res.json(req.application);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var application = _.findIndex(applications, {id: req.params.id});
        if (!applications[application]) {
            res.send();
        } else {
            var updatedapplication = _.assign(applications[application], update);
            res.json(updatedapplication);
        }
    });

module.exports = applicationRouter;