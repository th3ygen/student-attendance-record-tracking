module.exports = async function() {
    const User = require('./models/User');
    const user = await User.findOne();
    if (!user) {
        const admin = await User.registerAdmin(
            'Administrator',
            'admin@admin.com',
            'admin',
            'admin',
        );

        const teacher = await User.register(
            'Teacher',
            'teacher@teacher.com',
            'teacher',
            'teacher',
        );

    }
}