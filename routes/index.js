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

/*
if(req.session.page_views){
  req.session.page_views++;
  res.send("You visited this page " + req.session.page_views + " times");
} else {
  req.session.page_views = 1;
  res.send("Welcome to this page for the first time!");
}
*/

var Users = [];
// check if access code has been entered
function checkSignIn(req, res){
   if(req.session.code){
      console.log('active! code is '+req.session.code);
   } else {
      console.log('NO!'+req.session.code);
   }
   next();
}
router.post('/checkCode', function(req, res){
  console.log(req.body.code);
  if(req.body.code == 'indeed2024'){
    req.session.code = true;
    res.redirect('/indeed');
  } else {
    console.log('wrong code!')
  }
});

// agnostic JS router - doesn't serve the title though
/*
router.get('/:id', function(req, res){
  ajaxTest(req);
  res.render(req.params.id, {
    isAJAX : isAJAX
  });
});
*/
router.get('/test', function(req, res){
  ajaxTest(req);
  res.render('test', {
    title: '!!!!!!!!!!!!!!!!!!!!!!!!',
    isAJAX : isAJAX
  });
});

router.get('/indeed', checkSignIn, function(req, res, next){
  ajaxTest(req);
  res.render('indeed', {
    title: 'Indeed'+baseTitle,
    isAJAX : isAJAX,
  });
});


router.get('/', function(req, res){
  ajaxTest(req);
  res.render('index', {
    title: 'Layton Hayes : Experience + Product Design',
    isAJAX : isAJAX
  });
});

router.get('/ticketmaster-resale', function(req, res){
  ajaxTest(req);
  res.render('ticketmaster-resale', {
    title: 'Ticketmaster Resale'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/ticketmaster', function(req, res){
  ajaxTest(req);
  res.render('ticketmaster', {
    title: 'Ticketmaster'+baseTitle,
    isAJAX : isAJAX
  });
});

router.get('/friendbuy', function(req, res){
  res.redirect('https://www.dropbox.com/sh/sj3ocjcugtmrvx7/AAD7BHaxfXaeb-5D_xfeLA6Ia?dl=0');
});

router.get('/nike', function(req, res){
  ajaxTest(req);
  res.render('nike', {
    title: 'Nike WD+C'+baseTitle,
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

router.get('/cengage', function(req, res){
  ajaxTest(req);
  res.render('cengage', {
    title: 'Cengage MindTap'+baseTitle,
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

router.get('/first-american', function(req, res){
  ajaxTest(req);
  res.render('first-american', {
    title: 'First American - Palomar'+baseTitle,
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