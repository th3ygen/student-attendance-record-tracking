const User = require('../models/User');

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.login(username, password);

            if (!user) {
                res.status(401).send('Invalid username or password');
            }

            res.status(200).json({
                user
            });
        } catch (error) {
            res.status(400).json({error});
        }
    },
    register: async (req, res) => {
        try {
            const { name, email, username, password } = req.body;

            const token = User.register(name, email, username, password);

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
    },
    editTeacher: async (req, res) => {
        try {
            const { id, name, email, username } = req.body;

            const teacher = await User.findById(id);

            if (!teacher) {
                res.status(404).send('Teacher not found');
            }

            teacher.name = name;
            teacher.email = email;
            teacher.username = username;

            await teacher.save();

            res.status(200).json({
                teacher
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
    getTeachers: async (req, res) => {
        try {
            const teachers = await User.find({role: 'teacher'});

            res.status(200).json({
                teachers,
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    },
    deleteTeacher: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json({
                message: "Teacher deleted",
            });
        } catch (e) {
            res.status(500).json({
                message: e.message,
            });
        }
    }
};