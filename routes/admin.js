var express = require('express');
var router = express.Router();
var Fooditem = require('../models/fooditem');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin');
});

router.get('/addfood', function(req, res, next) {
  res.render('addfood');
    
  
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
    category : req.body.category

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








// router.post('/addfood', function(req, res, next) {


//   res.render('dashboard');
// });
module.exports = router;
