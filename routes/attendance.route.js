const router = require('express').Router();
const controller = require('../controllers/attendance.controller');

router.get('/', (req, res) => {
    res.send('Attendance API');
});

router.get('/get', controller.getAttendances);

router.post('/add', controller.newAttendance);

router.delete('/delete/:id', controller.deleteAttendance);

module.exports = router;