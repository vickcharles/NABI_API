var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QualificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('qualification', QualificationSchema);
