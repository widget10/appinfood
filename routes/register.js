var express = require('express');
var User = require('../models/user');
var passport=require('passport');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});



router.post('/', function(req, res) {
  req.body.username
  req.body.password
  req.body.email
  req.body.firstname
  req.body.lastname
  User.register(new User({username:req.body.username,email:req.body.email,firstname:req.body.firstname,lastname:req.body.lastname}),req.body.password,function(err,user){
  	if(err){
  		console.log(err);
  		 return res.render('register');
  	}
  	passport.authenticate("local")(req,res,function(){
  		res.redirect("/login");
  	});
  });
});


module.exports = router;
