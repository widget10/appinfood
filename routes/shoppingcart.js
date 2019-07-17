var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Fooditem = require('../models/fooditem');

/* GET users listing. */
// router.get('/', function(req, res, next) {
// //   res.send('respond with a resource');


// Fooditem.find()    
//    .then( (food) => {
//     res.render('shoppingcart',{
//         qty: req.session.cart.totalQty,
//         title:'Shop',
//         food:food
//     }
//     );

// });
// });


router.get('/', function(req,res,next){
if(!req.session.cart) {
    return res.render('shoppingcart',{fooditem:null} );

}
 var cart = new Cart(req.session.cart);
 console.log(cart.generateArray())
 res.render('shoppingcart', {
     title:'Shopping cart',
      data: cart.generateArray(),
      totalPrice : cart.totalPrice,
        qty: req.session.cart.totalQty
    })
});

module.exports = router;
