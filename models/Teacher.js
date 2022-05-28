const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "secret";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
});

userSchema.statics.register = function (name, email, password, role) {
    if (!['student', 'teacher'].includes(role)) {
        role = 'student';
    }

    return this.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        role
    });
}

userSchema.statics.login = async function (name, password) {
    const user = await this.findOne({ name });

    if (!user) {
        return null;
    }

    // compare
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return null;
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        role: user.role
    }, SECRET);

    return token;
}

const User = model('User', userSchema);

module.exports = User || model('User', userSchema);