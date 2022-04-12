const http = require('http');

http.createServer((req, res) => {
    console.log(req);
    console.log(res);
}).listen(8080, () => {
    console.log('8080 포트에서 서버 연결 중');
});
