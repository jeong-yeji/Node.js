const express = require('express');
const app = express();

app.get('/', function (req, res, next) {
    res.send('Hello World!');
    next();
});

const myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.use(myLogger);
app.listen(8080);

// 미들웨어는 위에서 아래로 실행됨
// app.get('/')이 수행되고, res.send()가 끝난 뒤 응답 종료
// => myLogger까지 도달하지 않음
// => next()를 통해 다음 미들웨어로 넘어가도록 흐름을 제어해줘야됨

// next() : 다음 미들웨어로 가는 역할
// next(error) : 오류 처리 미들웨어로 가는 역할
// next('route') : 같은 라우트에서 분기처리 할 때 사용
