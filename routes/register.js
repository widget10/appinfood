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
  req.body.email
  req.body.password
  req.body.role
  req.body.name
  // req.body.lastname
  User.register(new User({email:req.body.email,name:req.body.name,username:req.body.username,role:req.body.role}),req.body.password,function(err,user){
  	if(err){
  		console.log(err);
      //  return res.render('register');
      res.send("hsbdk");
  	}
  	passport.authenticate("local")(req,res,function(){
  		res.redirect("/login");
  	});
  });
});


module.exports = router;
