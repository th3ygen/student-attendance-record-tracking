const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'on medical leave'],
        required: true
    },
    attachments: [String],
    remarks: String,
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});

attendanceSchema.statics.add = function (studentId) {


const Attendance = model('Attendance', attendanceSchema);

module.exports = Attendance;