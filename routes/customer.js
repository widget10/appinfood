var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });



router.get('/customer/add-to-cart/:id', function(req,res,next){
    var fooditemsId= req.params.id;
    console.log(fooditemsId)
    var cart = new Cart(req.session.cart ? req.session.cart: {});
    Fooditem.findById(fooditemsId, function(err,product){
        if(err){
            return res.redirect('/');
        }
        cart.add(fooditem,fooditem.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');

    });
});




module.exports = router;


