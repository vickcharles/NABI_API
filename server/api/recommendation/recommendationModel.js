var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
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

module.exports = mongoose.model('recommendation', RecommendationSchema);
