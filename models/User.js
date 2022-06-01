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

userSchema.statics.register = function (name, email, username, password) {
    return this.create({
        name,
        email,
        username,
        password: bcrypt.hashSync(password, 10),
        role: 'teacher'
    });
}

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });

    if (!user) {
        return null;
    }
    
    // compare
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid) {
        return null;
    }
    
    const token = await jwt.sign({
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role
    }, SECRET);

    return {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        token
    };
}

const User = model('User', userSchema);

module.exports = User || model('User', userSchema);