const { Schema, model } = require('mongoose');

const recSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    datetime: Date,
    attendanceId: {
        type: Schema.Types.ObjectId,
        ref: 'Attendance',
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'on medical leave'],
    },
    remarks: String
});

module.exports = model('AttendanceRecord', recSchema);