
var express = require('express');

module.exports = function(app) {
  var router = express.Router();
  var config = app.get('config');
  
  var setVars = [
    setViewVar('version', app.get('clientVersion')),
    setViewVar('title', 'CityAgro'),
  ];

  var stack = [
    render('index')
  ];

  router.get("/", setVars.concat(stack));

  return router;
};

var render = function(path) {
  return function(req, res) {
    res.render(path);
  };
};

var redirect = function(route) {
  return function(req, res) {
    res.redirect(route);
  };
};

var setViewVar = function(key, value) {
  return function(req, res, next) {
    res.locals[key] = value;
    next();
  };
};
