const router = require('express').Router();

router.use('/attendance', require('./attendance.route'));
router.use('/class', require('./class.route'));
router.use('/user', require('./user.route'));

router.get('*', (req, res) => {
    res.status(404).send('API not found');
});

module.exports = router;