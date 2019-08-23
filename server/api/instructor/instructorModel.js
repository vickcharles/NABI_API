var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstructorSchema = new Schema({
  avatar: Buffer,
  bio: String,
  canTeach: [{
		instrument: {
			type: Schema.Types.ObjectId, 
			ref: 'instrument'
		},
		skillLevel:{
			type: String,
			required: true
		}
	}],
	rates: [{
		type: Schema.Types.ObjectId, 
    ref: 'rate'
	}],
	schedule:{
		type: Schema.Types.ObjectId, 
    ref: 'schedule'
	},
	music:{
		soundCloud: String,
		youtube: String,
    vimeo: String,
    Spinrilla: String,
    AppleMuisc: String,
    Spotify: String
	},
	education: [{
		type: Schema.Types.ObjectId, 
    ref: 'education'
	}],
  yearsOfExperience: {
    type: Number,
    required: true
  },
	experience:[{
		type: Schema.Types.ObjectId, 
    ref: 'experience'
	}],
	additionalQualifications: [{
		type: Schema.Types.ObjectId, 
    ref: 'qualification'
	}],
	recomendations: [{
		type: Schema.Types.ObjectId, 
    ref: 'recommendation'
	}],
	students: [{
		type: Schema.Types.ObjectId, 
    ref: 'user'
	}],
	lessonsTaught: Number,
	upcomingLessons: Number,
	messages: [{
		type: Schema.Types.ObjectId, 
    ref: 'message'
	}],
	reviews: [{
		type: Schema.Types.ObjectId, 
    ref: 'review'
	}],
	payments:{
		type: Schema.Types.ObjectId, 
    ref: 'payment'
  },
  createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
});

module.exports = mongoose.model('instructor', InstructorSchema);