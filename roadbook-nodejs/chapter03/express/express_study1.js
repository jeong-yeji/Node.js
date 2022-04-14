const express = require('express');
const app = express();

// 실습 1
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
// app.listen(8080, () => console.log('8080포트에서 서버 실행중'));

// 실습 2
app.set('port', process.env.PORT || 8080); // 기본 포트가 있으면 기본 포트 사용, 없으면 8080번
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
