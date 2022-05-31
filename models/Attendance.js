const { Schema, model } = require('mongoose');

const recSchema = new Schema({
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    date: String,
    timeslot: String,
    list: [{
        studentId: {
            type: Schema.Types.ObjectId,
            ref: 'Student',
        },
        status: String,
    }],
}, {
    timestamps: true
});

module.exports = model('Attendance', recSchema); 