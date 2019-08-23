var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    reviewer: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('review', ReviewSchema);
