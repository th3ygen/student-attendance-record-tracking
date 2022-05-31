const router = require('express').Router();
const controller = require('../controllers/class.controller');

router.get('/', (req, res) => {
    res.send('Class API');
});

router.get('/student/get', controller.getStudents);
router.delete('/student/delete/:id', controller.deleteStudent);

router.post('/student/new', controller.newStudent);
router.post('/student/add', controller.addStudent);

router.get('/get', controller.getClasses);
router.get('/:id', controller.getClass);
router.post('/add', controller.addClass);
router.post('/edit/:id', controller.editClass);

router.get('/:id/students', controller.getStudentsByClassId);

router.post('/delete', controller.deleteClass);

router.get('/enrolled', (req, res) => {
    
});

module.exports = router;