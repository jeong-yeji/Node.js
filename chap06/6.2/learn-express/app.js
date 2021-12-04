const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

// req, ers, next 같은 것은 미들웨어 내부에 있으므로 작성할 필요 없음

dotenv.config(); // .env 파일을 읽어서 process.env로 만듦
const app = express();
app.set('port', process.env.PORT || 3000);

// morgan : 기본 로그 외에 추가적인 로그 출력
// dev : [HTTP 메소드] [주소] [HTTP 상태 코드] [응답 속도] [응답 바이트] ex.GET / 500 32.478 ms - 50
// dev, combined, common, short, tiny 등 다양한 모드 사용 가능
app.use(morgan('dev'));
// static : 정적인 파일을 제공하는 라우터 역할. 기본적으로 제공되므로 설치 필요 x
// 요청 주소와 실제 주소가 다르므로 보안에 좋음
// 요청 주소 : http://localhost:3000/stylesheets/style.css
// 실제 주소 : public/stylesheets/style.css
app.use('/', express.static(path.join(__dirname, 'public')));
// body-parser : 요청의 본문에 있는 데이터를 해석해 req.body 객체로 만들어주는 미들웨어
// 단, 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못하므로 multer 모듈 사용
// express 4.16.0부터 body-parser의 일부 기능이 내장되어 있으므로 설치 필요 x
// Raw, Text 형식의 데이터를 해석해야 될 때는 설치 필요
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie-parser : 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦
app.use(cookieParser(process.env.COOKIE_SECRET));
// express-session : 세션 관리용 미들웨어. 사용자별로 req.session 객체 안에 저장됨
app.use(
    session({
        resave: false, // 요청이 올 때 세션에 수정 사장이 생기지 않더라도 다시 저장할지
        saveUninitialized: false, // 세션에 저장할 내역이 없더라도 처음부터 세션을 설정할지
        secret: process.env.COOKIE_SECRET, // 안전한 쿠키 전송을 위한 서명. cookie-pareser.secret과 같게 하는 것이 좋음
        cookie: {
            // 쿠키 관련 속성 : maxAge, domain, path, expires, sameSite, httpOnly, secure, store 등
            httpOnly: true, // 클라이언트에서 쿠키 확인 불가능하게
            secure: false, // https가 아닌 환경에서도 사용가능하도록. 배포 시에는 true로 하는 것이 좋음
            // store : DB 연겨하여 세션 유지하도록 설정
        },
        name: 'session-cookie', // 세션 쿠키명 default: connect.sid
    })
);

const multer = require('multer');
const fs = require('fs');

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
});

// app.use(미들웨어) : 모든 요청에서 미들웨어 실행
// app.use('/abc', 미들웨어) : abc로 시작하는 요청에서 미들웨어 실행
// app.post('/abc', 미들웨어) : abc로 시작하는 POST 요청에서 미들웨어 실행
// app.use((req, res, next) => {
//     console.log('모든 요청에 다 실행됩니다.');
//     next(); // 다음 미들웨어로  넘어가는 함수
// });
app.get(
    '/',
    (req, res, next) => {
        console.log('GET / 요청에서만 실행됩니다.');
        next(); // 다음 미들웨어로 넘어가는 함수
    },
    (req, res) => {
        throw new Error('에러는 에러 처리 미들웨어로 갑니다.');
    }
);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});
