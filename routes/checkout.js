var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Fooditem = require('../models/fooditem');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('checkout');
// });





router.get('/', function(req,res,next){
    if(!req.session.cart) {
        return res.redirect('shoppingcart');
    
    }
     var cart = new Cart(req.session.cart);
     
     res.render('checkout', {
        
          totalPrice : cart.totalPrice
        
        });
    });

module.exports = router;
