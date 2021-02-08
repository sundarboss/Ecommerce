const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
    date: {type: Date, required: true},
    userid: { type: Schema.Types.ObjectId, ref: 'User'},
    details: [],
    status: {type: Boolean, required: true},
    value: {type: Number, required: true},
    paymentmode: {type: String, required: true},
    deliverydate: Date
});

module.exports = mongoose.model('Order', orderSchema);