const router = require('express').Router();
const controller = require('../controllers/class.controller');

router.get('/', (req, res) => {
    res.send('Class API');
});

router.get('/student/get', controller.getStudents);
router.delete('/student/delete/:id', controller.deleteStudent);

router.post('/student/new', controller.newStudent);
router.post('/add', controller.addClass);

router.get('/enrolled', (req, res) => {
    
});

module.exports = router;