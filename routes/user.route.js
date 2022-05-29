const router = require('express').Router();
const controller = require('../controllers/user.controller');

router.get('/', (req, res) => {
    res.send('User API');
});

router.get('/teacher/get', controller.getTeachers);

router.delete('/teacher/delete/:id', controller.deleteTeacher);

router.post('/login', controller.login);
router.post('/register', controller.register);

router.post('/teacher/new', controller.newTeacher);

module.exports = router;