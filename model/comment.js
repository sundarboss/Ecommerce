const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
    productid: { type: Schema.Types.ObjectId, ref: 'Product'},
    userid: { type: Schema.Types.ObjectId, ref: 'User'},
    comment: {type: String, required: true},
    created: {type: Date, required: true}
});

module.exports = mongoose.model('Comment', commentSchema);