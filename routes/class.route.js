const router = require('express').Router();
const controller = require('../controllers/class.controller');

router.get('/', (req, res) => {
    res.send('Class API');
});

router.get('/student/:id', controller.getStudent);
router.get('/students/get', controller.getStudents);
router.post('/std/update', controller.editStudent);
router.delete('/student/delete/:id', controller.deleteStudent);

router.post('/student/new', controller.newStudent);
router.post('/student/add', controller.addStudent);

router.get('/get', controller.getClasses);
router.get('/find', controller.getClass);
router.post('/add', controller.addClass);
router.post('/edit/:id', controller.editClass);

/* router.get('/:id/students', controller.getStudentsByClassId); */

router.post('/delete', controller.deleteClass);


module.exports = router;