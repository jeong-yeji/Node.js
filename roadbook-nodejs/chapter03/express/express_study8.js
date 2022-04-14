// 미들웨어 통합 테스트
const express = require('express');
const morgan = require('morgan'); // Logger API
const cookieParser = require('cookie-parser'); // 파싱 함수 없이 express의 req 객체에 cookies 속성 부여 => res.cookies.쿠키명으로 접근 가능
const session = require('express-session'); // 세션 사용 시 필요한 임의의 키 값 생성
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 공통 미들웨어
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser('secret@1234')); // 암호화된 쿠키를 사용하기 위한 임의의 문자 전송
app.use(
    session({
        secret: 'secret@1234', // 암호화
        resave: false, // 새로운 요청 시 세션에 변동 사항이 없어도 다시 저장할지 설정
        saveUninitialized: true, // 세션에 저장할 내용이 없어도 저장할지 설정
        cookie: {
            // 세션 쿠키 옵션들 설정
            // ex) httpOnly, expires, domain, path, secure, sameSite
            httpOnly: true, // 로그인 구현 시 필수 적용, JS로 접근할 수 없게 하는 기능
        },
        // name: 'connect.sid', // 세션 쿠키의 name 지정. default) connect.sid
    })
);
// express.json, express.urlencoded
// : 클라이언트에서 post, put 요청 시 들어온 정보를 가진 req.body에 접근하는데 사용
// 요청 정보는 url이 아닌 request body에 들어있는데,
// 이 값을 읽을 수 있는 구문으로 파싱하고 req.body로 옮겨주는 역할
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.get('/', (req, res) => {
    if (req.session.name) {
        const output = `
            <h2>로그인한 사용자님</h2><br>
            <p>${req.session.name}님 안녕하세요.</p><br>
        `;
        res.send(output);
    } else {
        const output = `
            <h2>로그인하지 않은 사용자입니다</h2><br>
            <p>로그인 해주세요.</p><br>
        `;
        res.send(output);
    }
});

app.get('/login', (req, res) => {
    // 실제 구현 시 post
    console.log(req.session);

    // 쿠키를 사용할 경우 쿠키에 갑 설정
    // res.cookie(name, value, options);

    // 세션 쿠키를 사용할 경우
    req.session.name = '로드북';
    res.end('Login OK');
});

app.get('/logout', (req, res) => {
    res.clearCookie('connect.sid'); // 세션 쿠키 삭제
    res.end('Logout OK');
});

// 서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
