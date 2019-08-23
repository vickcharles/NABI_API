var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EducationSchema = new Schema({
    schoolName: {
        type: String,
        required: true
    },
    graduationYear: {
        type: Number,
        required: true
    },
    degreeType: {
        type: String,
        required: true
    },
    fieldOfStudy: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('education', EducationSchema);
