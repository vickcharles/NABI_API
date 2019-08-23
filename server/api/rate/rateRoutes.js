var _ = require('lodash');
var rateRouter = require('express').Router();

var rates = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

rateRouter.param('id', function(req, res, next, id) {
  var rate = _.find(rates, {id: id})
  if (rate) {
    req.rate = rate;
    next();
  } else {
    res.send();
  }
});

rateRouter.route('/')
    .get(function(req, res){
        res.json(rates);
    })
    .post(updateId, function(req, res) {
        var rate = req.body;
        rates.push(rate);
        res.json(rate);
    });

rateRouter.route('/:id')
    .get(function(req, res){
        var rate = req.rate;
        res.json(rate || {});
    })
    .delete(function(req, res) {
        var rate = _.findIndex(rates, {id: req.params.id});
        rates.splice(rate, 1);
        res.json(req.rate);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var rate = _.findIndex(rates, {id: req.params.id});
        if (!rates[rate]) {
            res.send();
        } else {
            var updatedrate = _.assign(rates[rate], update);
            res.json(updatedrate);
        }
    });

module.exports = rateRouter;