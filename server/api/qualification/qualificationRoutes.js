var _ = require('lodash');
var qualificationRouter = require('express').Router();

var qualifications = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

qualificationRouter.param('id', function(req, res, next, id) {
  var qualification = _.find(qualifications, {id: id})
  if (qualification) {
    req.qualification = qualification;
    next();
  } else {
    res.send();
  }
});

qualificationRouter.route('/')
    .get(function(req, res){
        res.json(qualifications);
    })
    .post(updateId, function(req, res) {
        var qualification = req.body;
        qualifications.push(qualification);
        res.json(qualification);
    });

qualificationRouter.route('/:id')
    .get(function(req, res){
        var qualification = req.qualification;
        res.json(qualification || {});
    })
    .delete(function(req, res) {
        var qualification = _.findIndex(qualifications, {id: req.params.id});
        qualifications.splice(qualification, 1);
        res.json(req.qualification);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var qualification = _.findIndex(qualifications, {id: req.params.id});
        if (!qualifications[qualification]) {
            res.send();
        } else {
            var updatedqualification = _.assign(qualifications[qualification], update);
            res.json(updatedqualification);
        }
    });

module.exports = qualificationRouter;