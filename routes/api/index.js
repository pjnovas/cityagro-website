
var express = require('express');
var products = require('./products');

module.exports = function(app) {
  var config = app.get("config");
  var router = express.Router();
  
  products.register(router, config);

  router.get('/', function(req, res) {
    res.send({ title: 'API - CityAgro' });
  });

  return router;
};
