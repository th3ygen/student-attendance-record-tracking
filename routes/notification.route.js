const router = require('express').Router();
const controller = require('../controllers/notification.controller');

router.get('/', (req, res) => {
    res.send('Notification API');
});

router.get('/get', controller.getNotifications)

router.post('/new', controller.pushNotification)

module.exports = router;