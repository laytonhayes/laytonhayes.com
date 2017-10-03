var express = require('express');
var router = express.Router();
var baseTitle = 'Layton Hayes : ';
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

router.get('/', function(req, res){
  ajaxTest(req);
  res.render('index', {
    title: baseTitle+'Home',
    isAJAX : isAJAX
  });
});

router.get('/weather-tubes', function(req, res){
  ajaxTest(req);
  res.render('weather-tubes', {
    title: baseTitle+'Weather Tubes',
    isAJAX : isAJAX
  });
});

router.get('/nike', function(req, res){
  ajaxTest(req);
  res.render('nike', {
    title: baseTitle+'Nike WD+C',
    isAJAX : isAJAX
  });
});

router.get('/tape-stacks', function(req, res){
  ajaxTest(req);
  res.render('tape-stacks', {
    title: baseTitle+'Tape Stacks',
    isAJAX : isAJAX
  });
});

router.get('/first-american', function(req, res){
  ajaxTest(req);
  res.render('first-american', {
    title: baseTitle+'First American - Palomar',
    isAJAX : isAJAX
  });
});

router.get('/terradata', function(req, res){
  ajaxTest(req);
  res.render('terradata', {
    title: baseTitle+'Terradata IntelliCloud',
    isAJAX : isAJAX
  });
});

router.get('/maritz', function(req, res){
  ajaxTest(req);
  res.render('maritz', {
    title: baseTitle+'Maritz CultureNext',
    isAJAX : isAJAX
  });
});

router.get('/cengage', function(req, res){
  ajaxTest(req);
  res.render('cengage', {
    title: baseTitle+'Cengage MindTap',
    isAJAX : isAJAX
  });
});

router.get('/washing-machine-microsite', function(req, res){
  ajaxTest(req);
  res.render('washing-machine-microsite', {
    title: baseTitle+'Washing Machine Microsite',
    isAJAX : isAJAX
  });
});

module.exports = router;