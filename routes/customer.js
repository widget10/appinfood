var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Fooditem = require('../models/fooditem');
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
function Cart(oldCart){
    this.items =oldCart.items  || {};
    this.totalQty=oldCart.totalQty || 0;
    this.totalPrice=oldCart.totalPrice || 0;
    console.log(oldCart)

    this.add = function(item,id){
        var storedItem= this.items[id];
        if(!storedItem){
            storedItem = this.items[id]={item:item,qty:0,price:0};
        }
        storedItem.qty++;
        storedItem.price=storedItem.item.price*storedItem.qty;
        this.totalQty++;
        this.totalPrice+= storedItem.item.price;
    }


    this.generateArray = function(){
        var arr =[];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    }
};

router.get('/cart', function(req,res,next){
Fooditem.find(function (err, docs){
    // var fooditemChunks =[];
    // var chunkSize= 3;
    // for(var i=0;i<docs.length;i+=chunkSize){
    //     fooditemChunks.push(docs.slice(i,i+chunkSize));
    // }
    res.render('cart',{title:'Shopping cart',
    food:docs,
    qty: req.session.cart.totalQty
});
});
});

router.get('/add-to-cart/:id', function(req,res,next){
    var fooditemsId= req.params.id;

    var cart = new Cart(req.session.cart ? req.session.cart : {items:{}});
    console.log(cart)
    Fooditem.findById(fooditemsId, function(err,fooditem){
        if(err){
            return res.redirect('/');
        }
        cart.add(fooditem,fooditem.id);
        req.session.cart = cart;
        res.redirect('/dashboard');
    });
});

module.exports = router;


