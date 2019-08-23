var _ = require('lodash');
var recommendationRouter = require('express').Router();

var recommendations = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

recommendationRouter.param('id', function(req, res, next, id) {
  var recommendation = _.find(recommendations, {id: id})
  if (recommendation) {
    req.recommendation = recommendation;
    next();
  } else {
    res.send();
  }
});

recommendationRouter.route('/')
    .get(function(req, res){
        res.json(recommendations);
    })
    .post(updateId, function(req, res) {
        var recommendation = req.body;
        recommendations.push(recommendation);
        res.json(recommendation);
    });

recommendationRouter.route('/:id')
    .get(function(req, res){
        var recommendation = req.recommendation;
        res.json(recommendation || {});
    })
    .delete(function(req, res) {
        var recommendation = _.findIndex(recommendations, {id: req.params.id});
        recommendations.splice(recommendation, 1);
        res.json(req.recommendation);
    })
    .put(function(req, res) {
        var update = req.body;
        if (update.id) {
            delete update.id
        }
        var recommendation = _.findIndex(recommendations, {id: req.params.id});
        if (!recommendations[recommendation]) {
            res.send();
        } else {
            var updatedrecommendation = _.assign(recommendations[recommendation], update);
            res.json(updatedrecommendation);
        }
    });

module.exports = recommendationRouter;