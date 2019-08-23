var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    receiver: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('message', MessageSchema);
