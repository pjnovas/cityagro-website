
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

module.exports = function(config) {

  var Product = new Schema({
    
      "name": { type: String, required: true }
      
    , "description": { type: String }

    , "link": { type: String }
    , "imageURL": { type: String }

    , "usd": { type: Number, default: 0 }
    , "ars": { type: Number, default: 0 }

    , "created": { type: Date, default: Date.now }
  });

  mongoose.model('Product', Product);
  
};
