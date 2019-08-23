var _ = require('lodash');
var instructorRouter = require('express').Router();

var instructors = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

instructorRouter.param('id', function(req, res, next, id) {
  var instructor = _.find(instructors, {id: id})
  if (instructor) {
    req.instructor = instructor;
    next();
  } else {
    res.send();
  }
});

instructorRouter.route('/')
    .get(function(req, res){
        res.json(instructors);
    })
    .post(updateId, function(req, res) {
        var instructor = req.body;
        instructors.push(instructor);
        res.json(instructor);
    });

instructorRouter.route('/:id')
    .get(function(req, res){
        var instructor = req.instructor;
        res.json(instructor || {});
    })
    .delete(function(req, res) {
        var instructor = _.findIndex(instructors, {id: req.params.id});
        instructors.splice(instructor, 1);
        res.json(req.instructor);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var instructor = _.findIndex(instructors, {id: req.params.id});
        if (!instructors[instructor]) {
            res.send();
        } else {
            var updatedinstructor = _.assign(instructors[instructor], update);
            res.json(updatedinstructor);
        }
    });

module.exports = instructorRouter;