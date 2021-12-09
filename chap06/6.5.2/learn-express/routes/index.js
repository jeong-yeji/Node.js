const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

router
    .route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });

module.exports = router;
