var _ = require('lodash');
var reviewRouter = require('express').Router();

var reviews = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

reviewRouter.param('id', function(req, res, next, id) {
  var review = _.find(reviews, {id: id})
  if (review) {
    req.review = review;
    next();
  } else {
    res.send();
  }
});

reviewRouter.route('/')
    .get(function(req, res){
        res.json(reviews);
    })
    .post(updateId, function(req, res) {
        var review = req.body;
        reviews.push(review);
        res.json(review);
    });

reviewRouter.route('/:id')
    .get(function(req, res){
        var review = req.review;
        res.json(review || {});
    })
    .delete(function(req, res) {
        var review = _.findIndex(reviews, {id: req.params.id});
        reviews.splice(review, 1);
        res.json(req.review);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var review = _.findIndex(reviews, {id: req.params.id});
        if (!reviews[review]) {
            res.send();
        } else {
            var updatedreview = _.assign(reviews[review], update);
            res.json(updatedreview);
        }
    });

module.exports = reviewRouter;