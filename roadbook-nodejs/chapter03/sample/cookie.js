// 쿠키 전달
const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Set-cookie': 'name=roadbook' });
    console.log(req.headers.cookie);
    res.end('Cookie --> Header');
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 연결 중 .. ');
});
