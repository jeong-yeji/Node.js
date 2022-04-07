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

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();

        // 쿠키 유효 시간 = 현재시간 + 5분
        expires.setMinutes(expires.getMinutes() + 5);

        res.writeHead(302, {
            Location: '/',
            // 헤더에 한글 사용 불가하므로 encodeURIComponent() 이용
            // Set-Cookie 값에는 줄바꿈 넣으면 안됨
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if (cookies.name) {
        // /login으로 시작하지 않지만 name이라는 쿠키가 있는 경우 => 로그인 상태로 간주
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        // /login으로 시작도 안하고 name 쿠키도 없을 때 => 로그인 페이지로 이동
        try {
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
}).listen(8084, () => {
    console.log('8084번 포트에서 서버 대기 중');
});

// Cookies
// 쿠키명=쿠키값 : 기본적인 쿠키 값
// Expires=날짜 : 만료기한. default) 클라이언트 종료 시
// Max-age=초 : Expires과 비슷하지만 초로 입력. Expires보다 우선
// Domain=도메인명 : 쿠키가 전송될 도메인 특정. default) 현재 도메인
// Path=URL : 쿠키가 전송될 URL 특정. default) / => 모든 URL에서 쿠키 전송 가능
// Secure : HTTPS인 경우에만 쿠키 전송
// HttpOnly : 설정 시 js에서 쿠키 접근 불가. 쿠키 조작 방지를 위해 설정 권장
