const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Class API');
});

router.get('/enrolled', (req, res) => {
    
});

module.exports = router;