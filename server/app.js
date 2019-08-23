'use strict';

const express = require('express');
const app = new express();
const api = require('./api/api');
const cors = require('cors');
// setup the app middlware
require('./middleware/appMiddleware')(app);

// TODO: Later move witelist to an enviroment constant json file
const whitelist = ['https://nabiui.herokuapp.com', 'http://nabiui.herokuapp.com', 'http://localhost:3000', 'http://localtest.com', 'http://localtest.com:3000']
var corsOptions = {
  optionsSuccessStatus : 200,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

// setup the app mongoose
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


// set mongo uri depending on environment
const config = require('./config/config');
const testURL = require('./config/testing');
const devURL = require('./config/development');
const prodURL = require('./config/production');

mongoose.connect(
  (process.env.NODE_ENV === config.dev) ? devURL.db.url :
  (process.env.NODE_ENV === config.test) ? testURL.db.url :
  prodURL.db.url,
  { useNewUrlParser: true }
);

const db = mongoose.connection;

db.on("error", function(err){
  console.error("Database connection error:", err);
});

db.once("open", function(){
  console.log("Database connection was successful!");
});

// setup the api
// before api route set cors header with option to allow pre-flight
app.use('*', cors(corsOptions));
app.use('/', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// set up global error handling
function errorHandler(err, req, res, next) {
  var code = err.code || 500;
  var message = err.message || '';
  res.writeHead(code, message, {'content-type' : 'text/plain'});
  res.end(message);
}
app.use(errorHandler);

// export the app for testing
module.exports = app;
