var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var stylus = require('stylus');

// point to the router
var index = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// disabled browser caching for views
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// test for access code
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "bang"}));


// call the router
app.use('/', index);

// TODO catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// TODO error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(8002);
console.log ('portfolio running at localhost:8002');
// module.exports = app;