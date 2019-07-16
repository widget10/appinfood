var express = require('express');
var User = require('../models/user');
var passport=require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// req.body.role
// post routes
router.post('/',
function(req, res, next) {	
	passport.authenticate("local",{
	successRedirect :"/dashboard",
	failureRedirect:"/login"
})
});



module.exports = router;
