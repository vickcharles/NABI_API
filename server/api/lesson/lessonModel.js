var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LessonSchema = new Schema({
  instructor: {
    type: Schema.Types.ObjectId, 
    ref: 'instructor',
    required: true
  },
  student: {
    type: Schema.Types.ObjectId, 
    ref: 'student',
    required: true
  },
  instrument: {
    type: Schema.Types.ObjectId, 
    ref: 'instrument',
    required: true
  },
  remaining: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('lesson', LessonSchema);
