const { Schema, model } = require('mongoose');

const recSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
    },
    datetime: Date,
    timeslot: String,
    status: {
        type: String,
        enum: ['present', 'absent', 'on medical leave'],
    },
    remarks: String
});

module.exports = model('AttendanceRecord', recSchema);