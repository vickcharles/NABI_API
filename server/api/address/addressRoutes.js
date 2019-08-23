var _ = require('lodash');
var addressRouter = require('express').Router();

var addresses = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

addressRouter.param('id', function(req, res, next, id) {
  var address = _.find(addresses, {id: id})
  if (address) {
    req.address = address;
    next();
  } else {
    res.send();
  }
});

addressRouter.route('/')
    .get(function(req, res){
        res.json(addresses);
    })
    .post(updateId, function(req, res) {
        var address = req.body;
        addresses.push(address);
        res.json(address);
    });

addressRouter.route('/:id')
    .get(function(req, res){
        var address = req.address;
        res.json(address || {});
    })
    .delete(function(req, res) {
        var address = _.findIndex(addresses, {id: req.params.id});
        addresses.splice(address, 1);
        res.json(req.address);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var address = _.findIndex(addresses, {id: req.params.id});
        if (!addresses[address]) {
            res.send();
        } else {
            var updatedaddress = _.assign(addresses[address], update);
            res.json(updatedaddress);
        }
    });

module.exports = addressRouter;