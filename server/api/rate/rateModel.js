var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RateSchema = new Schema({
    thirtyMins: Number,
    fortyFiveMins: Number,
    sixtyMins: Number,
    ninetyMins: Number
});

module.exports = mongoose.model('rate', RateSchema);
