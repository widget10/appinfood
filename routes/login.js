var express = require('express');
var User = require('../models/user');
var passport=require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});


// post routes
router.post('/', passport.authenticate("local",{
	successRedirect :"/admin",
	failureRedirect:"/login"
}),function(req, res) {
 
});



module.exports = router;
