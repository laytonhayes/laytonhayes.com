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

router.get('/about', function(req, res){
  if(req.xhr){
    var isAJAX = true
  } else {
    isAJAX = false
  }
  res.render('about', {
    title: baseTitle+'About',
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
    title: baseTitle+'Washing machine-microsite',
    isAJAX : isAJAX
  });
});

module.exports = router;