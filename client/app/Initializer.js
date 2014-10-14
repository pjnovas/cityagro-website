
module.exports = function(){

  window.cityagro = window.cityagro || {};

  // Init Helpers
  cityagro.settings = require('./settings');

  require("./handlebarsHelpers.js");
 
  require("./products")();

};
