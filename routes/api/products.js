
var mongoose = require('mongoose')
  , Product = mongoose.model('Product');

module.exports.register = function(router, _config) {
  router.get('/products', getList, sendList);
};

var getList = function(req, res, next){
  Product.find({ isPublic: true })
    .select("-__v -created -usd -ars -isPublic")
    .sort({ name: 'asc' })
    .exec(function(err, products) {
      if(err) return res.send(500);
      req.products = products || [];
      next();
    });
};

var sendList = function(req, res){
  res.send(req.products);
};
