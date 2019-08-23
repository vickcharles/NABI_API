var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    ammount: {
        type: Number,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    receiver: {
        type: Schema.Types.ObjectId, 
        ref: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    transactionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bankCard:{
        cardNumber: {
            type: Number, 
            required: true
        },
        expDate: {
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                requried: true
            }
        },
        ccv: {
            type: Number,
            required: true
        },
        billingAddress: {
            type: Schema.Types.ObjectId, 
            ref: 'address',
            required: true
        }
    },
    paypal: {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            requried: true
        }
    }
});

module.exports = mongoose.model('payment', PaymentSchema);
