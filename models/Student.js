const { Schema, model } = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    classEnrolled: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }],
});