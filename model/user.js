const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true, min: 3},
    email: {type: String, required: true, min: 6},
    password: {type: String, required: true, min: 6},
    admin: {type: Boolean, required: true},
    address: {type: String, required: true, min: 5},
    state: {type: String, required: true},
    country: {type: String, required: true},
    phone: {type: Number, required: true},
    cart: [{ type: Schema.Types.ObjectId, ref: 'Product'}]
});

module.exports = mongoose.model('User', userSchema);