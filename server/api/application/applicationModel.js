var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    request: {
        type: Schema.Types.ObjectId,
        ref: 'request'
    },
    rate: {
        type: Number,
        required: true
    },
    applicationBody: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('application', ApplicationSchema);
