/**
 * HELPER: Handlebars Template Helpers
 * 
 */

Handlebars.registerHelper('productImage', function(image) {
  if (image && image.indexOf("~") === -1){
    return cityagro.settings.productsImgs + image;
  }
  
  return "/images/noimage.png";
});
