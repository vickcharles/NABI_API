var _ = require('lodash');
var experienceRouter = require('express').Router();

var experiences = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

experienceRouter.param('id', function(req, res, next, id) {
  var experience = _.find(experiences, {id: id})
  if (experience) {
    req.experience = experience;
    next();
  } else {
    res.send();
  }
});

experienceRouter.route('/')
    .get(function(req, res){
        res.json(experiences);
    })
    .post(updateId, function(req, res) {
        var experience = req.body;
        experiences.push(experience);
        res.json(experience);
    });

experienceRouter.route('/:id')
    .get(function(req, res){
        var experience = req.experience;
        res.json(experience || {});
    })
    .delete(function(req, res) {
        var experience = _.findIndex(experiences, {id: req.params.id});
        experiences.splice(experience, 1);
        res.json(req.experience);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var experience = _.findIndex(experiences, {id: req.params.id});
        if (!experiences[experience]) {
            res.send();
        } else {
            var updatedexperience = _.assign(experiences[experience], update);
            res.json(updatedexperience);
        }
    });

module.exports = experienceRouter;