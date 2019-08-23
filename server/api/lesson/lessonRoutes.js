var _ = require('lodash');
var lessonRouter = require('express').Router();

var lessons = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

lessonRouter.param('id', function(req, res, next, id) {
  var lesson = _.find(lessons, {id: id})
  if (lesson) {
    req.lesson = lesson;
    next();
  } else {
    res.send();
  }
});

lessonRouter.route('/')
    .get(function(req, res){
        res.json(lessons);
    })
    .post(updateId, function(req, res) {
        var lesson = req.body;
        lessons.push(lesson);
        res.json(lesson);
    });

lessonRouter.route('/:id')
    .get(function(req, res){
        var lesson = req.lesson;
        res.json(lesson || {});
    })
    .delete(function(req, res) {
        var lesson = _.findIndex(lessons, {id: req.params.id});
        lessons.splice(lesson, 1);
        res.json(req.lesson);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var lesson = _.findIndex(lessons, {id: req.params.id});
        if (!lessons[lesson]) {
            res.send();
        } else {
            var updatedlesson = _.assign(lessons[lesson], update);
            res.json(updatedlesson);
        }
    });

module.exports = lessonRouter;