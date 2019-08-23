var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstrumentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('instrument', InstrumentSchema);
