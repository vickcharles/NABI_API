var _ = require('lodash');
var instrumentRouter = require('express').Router();

var instruments = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

instrumentRouter.param('id', function(req, res, next, id) {
  var instrument = _.find(instruments, {id: id})
  if (instrument) {
    req.instrument = instrument;
    next();
  } else {
    res.send();
  }
});

instrumentRouter.route('/')
    .get(function(req, res){
        res.json(instruments);
    })
    .post(updateId, function(req, res) {
        var instrument = req.body;
        instruments.push(instrument);
        res.json(instrument);
    });

instrumentRouter.route('/:id')
    .get(function(req, res){
        var instrument = req.instrument;
        res.json(instrument || {});
    })
    .delete(function(req, res) {
        var instrument = _.findIndex(instruments, {id: req.params.id});
        instruments.splice(instrument, 1);
        res.json(req.instrument);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var instrument = _.findIndex(instruments, {id: req.params.id});
        if (!instruments[instrument]) {
            res.send();
        } else {
            var updatedinstrument = _.assign(instruments[instrument], update);
            res.json(updatedinstrument);
        }
    });

module.exports = instrumentRouter;