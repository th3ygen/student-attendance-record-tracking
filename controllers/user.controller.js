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
    }
};