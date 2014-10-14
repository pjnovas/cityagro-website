
var expect = require('expect.js')
  , config = require('../config.test')
  , baseURL = "http://" + config.host + ":" + config.port + "/api"
  , request = require('request')
  , mongoose = require('mongoose');

mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

require('../models')(config);

describe('/api', function(){
  
  require('./products')(baseURL, config);
  
});

