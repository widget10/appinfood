var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = Schema({
    username: String,
    items: Array,
    date: String,
    time: String,
});

var Orders = mongoose.model('Order', orderSchema);

module.exports = Orders;






// completed: Boolean
   // timeUntilArrival: String,
    // secondsUntilArrival: Number,
    // timeSelectedForPickup: String,
    // expectedPickupTime: String,
     // specialInstructions: String,
    // selectedShop: String,
    // selectedShop_id: String,