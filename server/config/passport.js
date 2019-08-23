var localStrategy = require('passport-local').Strategy;
var User = require('../api/user/userModel')
const constants = require('../api/user/constants');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })

    passport.use(new localStrategy(function (username, password, done) {
        User.findOne({
          email: username
        }, function (err, doc) {
          if (err) {
            done(err)
          } else {
            if (doc) {
              var valid = doc.comparePassword(password, doc.password)
              if (valid) {
                // do not add password hash to session
                done(null, {
                  username: doc.email,
                  id: doc._id
                })
              } else {
                done(null, false)
              }
            } else {
              done(null, null, constants.noUserFound)
            }
          }
        })
    }))
}