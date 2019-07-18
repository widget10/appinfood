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



    // post
router.post('/',function(req,res,next){
    if(!req.session.cart) {
        return res.redirect('/shoppingcart');
    
    }
    var cart = new Cart(req.session.cart);
    

   
    const stripe = require('stripe')('sk_test_8dpCVhWZi2LfdTaLvZNxjWgd00AR1Tl9a0');

    stripe.charges.create({
      amount: cart.totalPrice,
      currency: "rs",
      source: req.body.stripeToken,
      description:"Test"
    }, 
      
    function(err,charge) {
      // asynchronously called,installed flash just require it
    //   if(err){
    //       req.flash('error', err.message);
    //       return releaseEvents.redirect('/checkout');

    //   }
    //   req.flash('success','Successfully placed order');
    //   req.cart=null;
    //   res.redirect('/');
    });








// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
// const token = req.body.stripeToken; // Using Express

// (async () => {
//   const charge = await stripe.charges.create({
//     amount: cart.totalPrice,
//     currency: 'Rs',
//     description: 'Example charge',
//     source: req.body.stripeToken,
//   });
// })();


});



module.exports = router;
