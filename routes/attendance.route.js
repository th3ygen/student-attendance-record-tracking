const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Attendance API');
});

module.exports = router;