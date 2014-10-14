
var express = require('express');

module.exports = function(app) {
  var mainRouter = express.Router();
  var config = app.get("config");

  var apiRouter = require('./api')(app);
  var siteRouter = require('./site')(app);

  mainRouter.use('/api', apiRouter);
  mainRouter.use('/', siteRouter);

  app.use(config.baseURL || '/', mainRouter);
};
