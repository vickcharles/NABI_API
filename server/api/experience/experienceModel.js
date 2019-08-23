var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExperienceSchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
	timePeriod:{
        from: {
            type: Date,
            required: true
        },
        to: {
            required: true
        }
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String
        },
        country: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('experience', ExperienceSchema);
