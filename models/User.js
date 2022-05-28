const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "secret";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
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
    role: {
        type: String,
        enum: ['admin', 'teacher'],
    }
}, {
    timestamps: true
});

userSchema.statics.register = function (name, email, username, password, role) {
    if (!['admin', 'teacher'].includes(role)) {
        role = 'teacher';
    }

    return this.create({
        name,
        email,
        username,
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