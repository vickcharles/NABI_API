var _ = require('lodash');
var paymentRouter = require('express').Router();

var payments = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

paymentRouter.param('id', function(req, res, next, id) {
  var payment = _.find(payments, {id: id})
  if (payment) {
    req.payment = payment;
    next();
  } else {
    res.send();
  }
});

paymentRouter.route('/')
    .get(function(req, res){
        res.json(payments);
    })
    .post(updateId, function(req, res) {
        var payment = req.body;
        payments.push(payment);
        res.json(payment);
    });

paymentRouter.route('/:id')
    .get(function(req, res){
        var payment = req.payment;
        res.json(payment || {});
    })
    .delete(function(req, res) {
        var payment = _.findIndex(payments, {id: req.params.id});
        payments.splice(payment, 1);
        res.json(req.payment);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var payment = _.findIndex(payments, {id: req.params.id});
        if (!payments[payment]) {
            res.send();
        } else {
            var updatedpayment = _.assign(payments[payment], update);
            res.json(updatedpayment);
        }
    });

module.exports = paymentRouter;