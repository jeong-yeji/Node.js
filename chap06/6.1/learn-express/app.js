const express = require('express');
const path = require('path');

const app = express();
// 서버가 실행될 포트 설정 : process.env.PORT가 존재하면 이 값 사용, 없으면 3000번 포트
app.set('port', process.env.PORT || 3000);

// GET, POST, PUT, PATCH, DELETE, OPTION에 대한 라우터를 위한 메소드
// app.get, app.post, app.put, app.patch, app.delete, app.options
app.get('/', (req, res) => {
    // 1. 문자열로 응답
    // express에서는 res.write()나 res.end() 대신 res.send() 사용
    // res.send('Hello, Express');

    // 2. HTML로 응답
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
