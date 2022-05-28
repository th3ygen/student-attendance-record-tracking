const { Schema, model } = require('mongoose');

const classSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timeSlot: [{
        type: String
    }],
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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

classSchema.methods.setTeacher = function (teacherId) {
    this.teacherId = teacherId;
    return this.save();
}

module.exports = model('Class', classSchema);