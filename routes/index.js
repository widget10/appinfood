var express = require('express');
var router = express.Router();
var Fooditem = require('../models/fooditem');
var Cart = require('../models/cart');


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index');
// });

 // var base64Flag = 'food:image/jpeg; base64,';
    // var imageStr = arraybufferToBase64(food[0].img.data);

    // var v = base64Flag + imageStr;
    
    //   function arraybufferToBase64(buffer){
//     var binary = '';
//     var bytes=[].slice.call(new Uint8Array(buffer));

//     bytes.forEach((b)=>
//   binary += String.fromCharCode(b));

//   return window.btoa(binary); 
  
// };

router.get('/', function(req, res, next) {
  
  req.session.cart = new Cart(req.session.cart ? req.session.cart : {items:{}});//makes cart when customer logins
  res.render('index');
});

router.get('/dashboard', function(req, res, next) {

 
  Fooditem.find()    
   .then( (food) => {
    res.render("dashboard", 
    {
      food : food ,
      qty: req.session.cart.totalQty
      // v:v
    });
    
  })
  .catch(err => {
    console.log(err);
  });





  
});


module.exports = router;
