var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var stylus = require('stylus');

//--!! view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//--!! router
var baseTitle = ' : Layton Hayes';
var isAJAX = false;
// test if an AJAX request and set global variable
function ajaxTest(req){
  if(req.xhr){
    isAJAX = true
  } else {
    isAJAX = false
  }
  return isAJAX;
}

// test for access code
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "bang"}));
// check if access code has been entered
function checkSignIn(req, res, next){
   if(req.session.code){
      console.log('active! code is '+req.session.code);
      next();
   } else {
      console.log('NO! '+req.session.code);
      var err = new Error("Not logged in!");
      next(err);  //Error, trying to access unauthorized page!
   }
}
app.post('/checkCode', function(req, res){
  if(req.body.code == 'indeed2024'){
    req.session.code = true;
    res.redirect('/indeed');
  } else {
    console.log('wrong code!');
    res.render('dynamic', {
        error: "TutorialsPoint", 
     });
  }
});

app.get('/', function(req, res){
  ajaxTest(req);
  res.render('index', {
    title: 'Layton Hayes : Experience + Product Design',
    isAJAX : isAJAX
  });
});
// indeed password protected
app.get('/indeed', checkSignIn, function(req, res){
  ajaxTest(req);
  res.render('indeed', {
    title: 'Indeed'+baseTitle,
    isAJAX : isAJAX,
  });
});
// agnostic JS router - doesn't serve the title though
app.get('/:id', function(req, res){
  ajaxTest(req);
  res.render(req.params.id, {
    isAJAX : isAJAX
  });
});





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