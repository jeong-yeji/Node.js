// middleware - express-session
// session : 실제 정보는 서버에만 저장해두고
// 브라우저에는 암호화된 키 값만 보내고
// 그 키값으로 실제 값에 접근할 수 있도록 하는 것
const http = require('http');

const session = {};
const sessKey = new Date();
session[sessKey] = { name: 'roadbook' };

http.createServer((req, res) => {
    res.writeHead(200, {
        'Set-cookie': `session=${sessKey.toUTCString()}`,
    });
    res.end('Session-Cookie --> Header');
}).listen(8080, () => {
    console.log('8080포트에서 서버 연결 중 ..');
});
