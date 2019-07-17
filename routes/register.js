var express = require('express');
var User = require('../models/user');
var passport=require('passport');
const bcrypt = require('bcryptjs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});



// router.post('/', function(req, res) {
//   req.body.username
//   req.body.email
//   req.body.password
//   req.body.role
//   req.body.name
//   // req.body.lastname
//   User.register(new User({email:req.body.email,name:req.body.name,username:req.body.username,role:req.body.role}),req.body.password,function(err,user){
//   	if(err){
//   		console.log(err);
//       //  return res.render('register');
//       res.send("hsbdk");
//   	}
//   	passport.authenticate("local")(req,res,function(){
//   		res.redirect("/login");
//   	});
//   });
// });

router.post('/',  function(req, res) {
  console.log(req.body);
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role
  const name = req.body.name
  const phone = req.body.phone
  User.findOne({ email })
    .then(userDoc => {
      if (userDoc) {
        res.send("emailexists try another")
        // req.flash(
        //   'error',
        //   'E-Mail exists already, please pick a different one.'
        // );
        // return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            name: req.body.name,
            password: hashedPassword,
              email: email,
            role : role ,
            username : username
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
});



module.exports = router;
