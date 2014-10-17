
module.exports = function(){

  window.cityagro = window.cityagro || {};

  // Init Helpers
  cityagro.settings = require('./settings');

  require("./handlebarsHelpers.js");
 
  require("./products")();

  smoothScroll.init({
    speed: 1000,
    easing: 'easeInOut'
  });

};
