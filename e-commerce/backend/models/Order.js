const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
    products : [{
        productId : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required: true},
        quantity : {type : Number, required: true}
    }],
    totalPrice : {type : Number, required: true},
    status : {type : String, default: 'pending'},
    date : {type : Date, default: Date.now},
    orderId : {type: Number, required: true, unique: true}
});

module.exports = mongoose.model('Order' , OrderSchema);