// 내 API 서버 만들기
const express = require('express');
const app = express();

app.get('/:type', (req, res) => {
    // 파라미터로 들어온 값은 req.params.type에 저장됨
    let { type } = req.params;
    res.send(type);
});

app.listen(8080);
