var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

router.get('/washing-machine-microsite', function(req, res){
  res.render('washing-machine-microsite', {
    title: 'Washing machine-microsite'
  });
});

module.exports = router;