var _ = require('lodash');
var educationRouter = require('express').Router();

var educations = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

educationRouter.param('id', function(req, res, next, id) {
  var education = _.find(educations, {id: id})
  if (education) {
    req.education = education;
    next();
  } else {
    res.send();
  }
});

educationRouter.route('/')
    .get(function(req, res){
        res.json(educations);
    })
    .post(updateId, function(req, res) {
        var education = req.body;
        educations.push(education);
        res.json(education);
    });

educationRouter.route('/:id')
    .get(function(req, res){
        var education = req.education;
        res.json(education || {});
    })
    .delete(function(req, res) {
        var education = _.findIndex(educations, {id: req.params.id});
        educations.splice(education, 1);
        res.json(req.education);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var education = _.findIndex(educations, {id: req.params.id});
        if (!educations[education]) {
            res.send();
        } else {
            var updatededucation = _.assign(educations[education], update);
            res.json(updatededucation);
        }
    });

module.exports = educationRouter;