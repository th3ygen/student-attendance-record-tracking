const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    classEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
});

const Student = model('Student', studentSchema);

module.exports = Student || model('Student', studentSchema);