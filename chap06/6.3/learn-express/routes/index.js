const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
    res.send('Hello, Express');
});

// 1. 주소는 같지만 메소드 다른 코드 하나로 처리 가능
router
    .route('/abc')
    .get((req, res) => {
        res.send('GET /abc');
    })
    .post((req, res) => {
        res.send('POST /abc');
    });

// 2.라우터 주소에는 정규표현식과 같은 특수 패턴 사용 가능
// 라우터 매개변수 : /user/1
// 주의! 일반 라우터보다 뒤에 위치해야됨!
// :id면 req.params.id로 조회 가능
// router.get('/user/:id', function (req, res) {
//     console.log(req.params, req.query);
// });

module.exports = router;
