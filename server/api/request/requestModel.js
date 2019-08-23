var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId, 
    ref: 'user'
  },
  instrument: {
    type: Array,
    required: true
  },
  skillLevel: {
    type: String,
    required: true
  },
  placeForLessons: {
    type: String,
    required: true
  },
  lessonsDuration: {
    type: Number,
    required: true
  },
  requestTitle: {
    type: String,
    required: true
  },
  requestBody: {
    type: String,
    required: true
  },
  createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('request', RequestSchema);