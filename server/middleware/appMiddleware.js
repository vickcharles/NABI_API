var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// setup global middleware here
module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'vaca-gandola-vieja',
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
};
