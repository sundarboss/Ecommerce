const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    specs: [String],
    image: {type: String, required: true},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
    category: { type: String, required: true},
    stock: {type: Number, required: true}
});

module.exports = mongoose.model('Product', productSchema);