var express = require('express');
var router = express.Router();
var Fooditem = require('../models/fooditem');



router.post('/delete/:id',  function(req, res,next) {
  console.log("auhdsgyi")
  res.send(req.params.id)
    Fooditem.findByIdAndRemove(req.params.id, function(err,food) {
        if (err)
            res.send(err);
        else
            res.render('dashboard');
    });
  }
  );


/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.cart = new Cart(req.session.cart ? req.session.cart : {items:{}});//makes cart when customer logins
  if(!req.session.cart) {

    return Fooditem.find()    
    .then( (food) => {
      res.render('admin/admindash',{
        title:'Dashboard',
        food : food,
        qty: 0
    } );
     
   })
   .catch(err => {
     console.log(err);
   });
}
 
  Fooditem.find()    
   .then( (food) => {
    res.render("admin/admindash", 
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


router.get('/addfood', function(req, res, next) {
  res.render('admin/addfood');
});

// post food route
router.post('/addfood', function(req, res) {

  // a.img.data = fs.readFileSync(imgPath);
  // a.img.contentType = 'image/png';
  var fooditem = new Fooditem({
    // img:req.body.img,
    foodname : req.body.foodname,
    price : req.body.price,
    des : req.body.des,
    category : req.body.category,
    category : req.body.category,
    img: req.body.img

  });
  fooditem.img.data = req.body.img;
  fooditem.img.contentType = 'image/png';
  fooditem.save(function(err) {
    if(err) {
      console.log(err);
      res.status(500).json({msg:'fail'});
    } else {
      res.redirect('/dashboard')
    }
  });
});




module.exports = router;
