const User = require('../models/User');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const token = User.login(username, password);

            if (!token) {
                res.status(401).send('Invalid username or password');
            }

            res.json({token});
        } catch (error) {
            res.status(400).json({error});
        }
    },
    register: async (req, res) => {
        try {
            const { username, password } = req.body;

            const token = User.register(username, password);

            res.json({token});
        } catch (error) {
            res.status(400).json({error});
        }
    },
    newTeacher: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;

            const token = await User.register(name, email, username, password, 'teacher');

            res.json({token});
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
};