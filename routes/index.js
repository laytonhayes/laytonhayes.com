var express = require('express');
var router = express.Router();
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

router.get('/', function(req, res){
  ajaxTest(req);
  res.render('index', {
    title: 'Layton Hayes : Experience + Product Design',
    isAJAX : isAJAX
  });
});

router.get('/weather-tube', function(req, res){
  ajaxTest(req);
  res.render('weather-tube', {
    title: 'Weather Tube'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/nike', function(req, res){
  ajaxTest(req);
  res.render('nike', {
    title: 'Nike WD+C'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/edassist', function(req, res){
  ajaxTest(req);
  res.render('edassist', {
    title: 'Bright Horizons EdAssist'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/tape-stacks', function(req, res){
  ajaxTest(req);
  res.render('tape-stacks', {
    title: 'Tape Stacks'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/first-american', function(req, res){
  ajaxTest(req);
  res.render('first-american', {
    title: 'First American - Palomar'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/teradata', function(req, res){
  ajaxTest(req);
  res.render('teradata', {
    title: 'Teradata IntelliCloud'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/maritz', function(req, res){
  ajaxTest(req);
  res.render('maritz', {
    title: 'Maritz CultureNext'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/cengage', function(req, res){
  ajaxTest(req);
  res.render('cengage', {
    title: 'Cengage MindTap'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/washing-machine-microsite', function(req, res){
  ajaxTest(req);
  res.render('washing-machine-microsite', {
    title: 'Washing Machine Microsite'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/urban-influence', function(req, res){
  ajaxTest(req);
  res.render('urban-influence', {
    title: 'Urban Influence'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/washing-machine', function(req, res){
  ajaxTest(req);
  res.render('washing-machine', {
    title: 'Washing Machine App'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/avalara', function(req, res){
  ajaxTest(req);
  res.render('avalara', {
    title: 'Avalara Tax Calculator'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/seattle-met', function(req, res){
  ajaxTest(req);
  res.render('seattle-met', {
    title: 'Seattle Met'+baseTitle,
    isAJAX : isAJAX
  });
});

module.exports = router;