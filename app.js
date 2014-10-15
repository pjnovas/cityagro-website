var 
    express = require('express')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , clientVersion = require('./package.json').version;

global.appRoot = path.resolve(__dirname);

var app = express();

// view engine setup
app.set('clientVersion', clientVersion);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Set Configs
switch(app.get('env')) {
  case "development":
    app.set('config', require('./config.dev')); 
    break;
  case "test":
    app.set('config', require('./config.test')); 
    break;
  case "production":
    app.set('config', require('./config.prod')); 
    break;
}

var config = app.get('config');

// Connect to MongoDB
mongoose.connect(config.db.url || ('mongodb://' + config.db.host + '/'+ config.db.name));

// Create Mongoose Models
require('./models')(config);

// Attach Router
require('./routes/index')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development' || app.get('env') === "test") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// send it to index page and log it
app.use(function(err, req, res, next) {
  console.log("ERROR ON REQUEST > " + req.originalUrl);
  console.log(err);

  res.redirect("/");
});


module.exports = app;
