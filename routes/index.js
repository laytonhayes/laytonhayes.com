var express = require('express');
var router = express.Router();
var baseTitle = 'Layton Hayes :: ';
var app = express();

router.get('/', function(req, res){
// TODO: make the AJAX test global
  if(req.xhr){
    var isAJAX = true
  } else {
    isAJAX = false
  }
  res.render('index', {
    title: baseTitle+'Home',
    isAJAX : isAJAX
  });
});

router.get('/weather-tubes', function(req, res){
    if(req.xhr){
    var isAJAX = true
  } else {
    isAJAX = false
  }
  res.render('weather-tubes', {
    title: baseTitle+'Weather Tubes',
    isAJAX : isAJAX
  });
});

router.get('/nike', function(req, res){
    if(req.xhr){
    var isAJAX = true
  } else {
    isAJAX = false
  }
  res.render('nike', {
    title: baseTitle+'Nike WD+C',
    isAJAX : isAJAX
  });
});

router.get('/washing-machine-microsite', function(req, res){
    if(req.xhr){
    var isAJAX = true
  } else {
    isAJAX = false
  }
  res.render('washing-machine-microsite', {
    title: baseTitle+'Washing Machine Microsite',
    isAJAX : isAJAX
  });
});

module.exports = router;