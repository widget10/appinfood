var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var foodItemSchema = Schema({
    foodname: String,
    des: String,
    category: String,
    price: Number,
    img: { data: Buffer, contentType: String }
});


module.exports = mongoose.model('Fooditem', foodItemSchema);






