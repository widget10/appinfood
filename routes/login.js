var express = require('express');
var User = require('../models/user');
var passport=require('passport');
var router = express.Router();
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

// req.body.role
// post routes
router.post('/',
function(req, res, next) {	
// 	passport.authenticate("local",{
// 	successRedirect :"/dashboard",
// 	failureRedirect:"/login"
// })

const email = req.body.email;
  const password = req.body.password;
  const role=req.body.role;
  console.log(role)
  User.findOne({ 'email': email })
    .then(user => {
      if (!user) {
		// req.flash('error', 'Invalid email or password.');
		console.log("invalid");
        return res.send('incalid');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {

            //otp verification

            // sendOtp.verify("919999999999", "4365", function (error, data) {
            //   console.log(data); // data object with keys 'message' and 'type'
            //   if(data.type == 'success') console.log('OTP verified successfully')
            //   if(data.type == 'error') console.log('OTP verification failed')
            // });




            // req.session.isLoggedIn = true;
            req.session.user = user;
            if(role == 1 && role == user.role){
              return req.session.save(err => {
               console.log(err);
               console.log("logn as admin")
               res.redirect('/');
               
             });
            }
            else if(role == user.role){
              return req.session.save(err => {
               console.log(err);
               console.log("logn as customer")

              res.redirect('/dashboard');
              });
            }
          }
		//   req.flash('error', 'Invalid email or password.');
		console.log('Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/');
        });
    })
    .catch(err => console.log(err));

});



module.exports = router;
