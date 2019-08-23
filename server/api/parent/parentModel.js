var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParentSchema = new Schema({
    children: [{
        type: Schema.Types.ObjectId, 
        ref: 'student'
    }]
});

module.exports = mongoose.model('parent', ParentSchema);
