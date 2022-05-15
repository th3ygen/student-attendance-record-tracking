const { Schema, model } = require('mongoose');

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }],
    attendances: [{
        type: Schema.Types.ObjectId,
        ref: 'Attendance'
    }],
}, {
    timestamp: true
});

classSchema.statics.add = function (name) {
    return this.create({
        name
    });
}

classSchema.statics.getAll = function () {
    return this.find({});
}

classSchema.methods.addStudent = function (studentId) {
    this.students.push(studentId);
    return this.save();
}

classSchema.methods.setTeacher = function (teacherId) {
    this.teacherId = teacherId;
    return this.save();
}

classSchema.methods.newAttendance = function (attendance) {
    this.attendances.push(attendance);
    return this.save();
}

classSchema.methods.getAttendances = function () {
    return this.attendances;
}

classSchema.methods.removeAttendance = function (attendanceId) {
    this.attendances.splice(this.attendances.indexOf(attendanceId), 1);
    return this.save();
}


module.exports = model('Class', classSchema);