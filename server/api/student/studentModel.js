var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
  skillLevel: {
    type: String,
    required: true
  },
	requests: [{
		type: Schema.Types.ObjectId, 
		ref: 'request'
	}],
	payments:[{
    type: Schema.Types.ObjectId, 
    ref: 'payment'
	}],
	lessons: [{
		type: Schema.Types.ObjectId, 
		ref: 'lesson'
  }],
  createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('student', StudentSchema);