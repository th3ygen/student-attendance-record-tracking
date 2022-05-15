const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Class API');
});

module.exports = router;