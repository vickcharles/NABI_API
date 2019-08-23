var _ = require('lodash');
var studentRouter = require('express').Router();

var students = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

studentRouter.param('id', function(req, res, next, id) {
  var student = _.find(students, {id: id})
  if (student) {
    req.student = student;
    next();
  } else {
    res.send();
  }
});

studentRouter.route('/')
    .get(function(req, res){
        res.json(students);
    })
    .post(updateId, function(req, res) {
        var student = req.body;
        students.push(student);
        res.json(student);
    });

studentRouter.route('/:id')
    .get(function(req, res){
        var student = req.student;
        res.json(student || {});
    })
    .delete(function(req, res) {
        var student = _.findIndex(students, {id: req.params.id});
        students.splice(student, 1);
        res.json(req.student);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var student = _.findIndex(students, {id: req.params.id});
        if (!students[student]) {
            res.send();
        } else {
            var updatedstudent = _.assign(students[student], update);
            res.json(updatedstudent);
        }
    });

module.exports = studentRouter;