const _ = require('lodash');
const router = require('express').Router();
var passport = require('passport');

const constants = require('./constants');
require('../../config/passport')(passport)

router.route('/')
  .post((req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }

      if (!user) {
        res.statusCode = 404;
        if (info) {
          return res.send(info)
        }
        return res.send(constants.incorrectPassword)
      }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(constants.tokenPlaceholder);
        // TODO: send token with jwt
        // res.send({
        //   token: req.user,
        // });
      });

    })(req, res, next);
  });

module.exports = router;
