var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScheduleSchema = new Schema({
    Monday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Tuesday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Wednesday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Thursday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Friday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Saturday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    Sunday: {
        eightAm: Boolean,
        tenAm: Boolean,
        twelvePm: Boolean,
        twoPm: Boolean,
        fourPm: Boolean,
        sixPm: Boolean,
        eightPm: Boolean
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('schedule', ScheduleSchema);
