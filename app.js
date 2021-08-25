var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var router_bootstrap = require('./config/bootstrap');
require("dotenv").config();
var app = express();
require("./config/databases");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: '*'
}));

app.use('/', router_bootstrap);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: "Oh no!"
  });
});

module.exports = app;
