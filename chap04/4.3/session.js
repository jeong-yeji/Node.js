// session 방식
// 서버에 사용자 정보 저장. 클라이언트와는 세션 아이디로만 소통
// 세션 쿠키 : 세션을 위해 사용하는 쿠키

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// parseCookies() : 문자열을 객체로 바꿔주는 함수
const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();

        expires.setMinutes(expires.getMinutes() + 5);
        const uniqueInt = Date.now(); // 쿠키에 이름을 담지 않고 숫자값 보냄
        session[uniqueInt] = {
            name,
            expires,
        }; // 사용자의 이름과 만료시간 저장

        res.writeHead(302, {
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.session && session[cookies.session].expires > new Date()) {
        // 세션 쿠키가 존재하고, 만료 기간이 지나지 않았다면
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`);
    } else {
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8085, () => {
    console.log('8085번 포트에서 서버 대기 중');
});

// 실제 배포에서는 변수가 아닌 레디스(Redis), 멤캐시드(Memcached)와 같은 DB에 저장
// 서버가 멈추거나 재시작 되면 메모리에 저장된 변수가 초기화 됨. 서버의 메모리가 부족하면 세션 저장 불가.
