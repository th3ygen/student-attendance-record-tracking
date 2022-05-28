const router = require('express').Router();
const controller = require('../controllers/class.controller');

router.get('/', (req, res) => {
    res.send('Class API');
});

router.post('/add', controller.addClass);

router.get('/enrolled', (req, res) => {
    
});

module.exports = router;