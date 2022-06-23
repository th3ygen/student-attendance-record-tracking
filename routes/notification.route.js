const router = require('express').Router();
const controller = require('../controllers/notification.controller');

router.get('/', (req, res) => {
    res.send('Notification API');
});

router.get('/get', controller.getNotifications)

router.get('/tobin/:id', controller.toBin)
router.get('/recover/:id', controller.recover)
router.get('/binsize', controller.getBinSize)

router.post('/new', controller.pushNotification)

module.exports = router;