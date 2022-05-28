const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', (req, res) => {
    res.send('User API');
});

router.post('/login', controller.login);
router.post('/register', controller.register);

router.post('/teacher/new', controller.newTeacher);

module.exports = router;