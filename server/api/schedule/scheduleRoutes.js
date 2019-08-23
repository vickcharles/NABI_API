var _ = require('lodash');
var scheduleRouter = require('express').Router();

var schedules = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

scheduleRouter.param('id', function(req, res, next, id) {
  var schedule = _.find(schedules, {id: id})
  if (schedule) {
    req.schedule = schedule;
    next();
  } else {
    res.send();
  }
});

scheduleRouter.route('/')
    .get(function(req, res){
        res.json(schedules);
    })
    .post(updateId, function(req, res) {
        var schedule = req.body;
        schedules.push(schedule);
        res.json(schedule);
    });

scheduleRouter.route('/:id')
    .get(function(req, res){
        var schedule = req.schedule;
        res.json(schedule || {});
    })
    .delete(function(req, res) {
        var schedule = _.findIndex(schedules, {id: req.params.id});
        schedules.splice(schedule, 1);
        res.json(req.schedule);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var schedule = _.findIndex(schedules, {id: req.params.id});
        if (!schedules[schedule]) {
            res.send();
        } else {
            var updatedschedule = _.assign(schedules[schedule], update);
            res.json(updatedschedule);
        }
    });

module.exports = scheduleRouter;