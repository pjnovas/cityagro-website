/*jshint latedef:false */

var tmpl = require("./templates/products.hbs.js");

module.exports = function(){

  var config = cityagro.settings;  

  var container = $("ul.products");
  var search = $("input#search");
  var allProducts = [];
  var searchProducts = [];

  $.ajax({
    url: config.apiURL + "/products",
    cache: false
  }).done(function(result){
    allProducts = result;
    searchProducts = allProducts.slice(0, config.maxProductsShow);
    bindProducts();
  });

  search.on("keyup", function(){

    var keyword = $.trim(search.val());

    if (keyword.length === 0){
      searchProducts = allProducts.slice(0, config.maxProductsShow);
    }
    else {
      var regex = new RegExp(getNormal(keyword), 'i');

      searchProducts = allProducts.filter( function(item){
        return (regex.test(getNormal(item.name)) || regex.test(getNormal(item.description)));
      }).slice(0, config.maxProductsShow);
    }

    bindProducts();
  });

  function bindProducts(){
    container.html(tmpl({ items: searchProducts }));
  }

};

function getNormal(text){
  text = text.replace(/Á/g,"A");
  text = text.replace(/á/g,"a");
  text = text.replace(/É/g,"E");
  text = text.replace(/é/g,"e");
  text = text.replace(/Í/g,"I");
  text = text.replace(/í/g,"i");
  text = text.replace(/Ó/g,"O");
  text = text.replace(/ó/g,"o");
  text = text.replace(/Ú/g,"U");
  text = text.replace(/ú/g,"u");
  
  return text;
}
