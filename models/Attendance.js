const { Schema, model } = require('mongoose');

const attendanceSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
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

const Attendance = model('Attendance', attendanceSchema);

module.exports = Attendance;