var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/temp', function(req, res, next) {
  res.render('dashboard');
});
module.exports = router;
