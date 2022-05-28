const { Schema, model } = require('mongoose');

const notiSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum: ['unread', 'read'],
    },
    type: {
        type: String,
        enum: ['general', 'class', 'attendance'],
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    }
});

const Notification = model('Notification', notiSchema);

module.exports = Notification || model('Notification', notiSchema);