const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('User API');
});

router.post('/login')

module.exports = router;