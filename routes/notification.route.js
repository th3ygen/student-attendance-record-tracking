const router = require('express').Router();
const controller = require('../controllers/notification.controller');

router.get('/', (req, res) => {
    res.send('Notification API');
});

router.get('/get', controller.getNotifications)

module.exports = router;