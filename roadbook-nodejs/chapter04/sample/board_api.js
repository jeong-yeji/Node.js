// 간단한 게시판 API 서버
const morgan = require('morgan');
const url = require('url');
const uuidAPIkey = require('uuid-apikey');
const cors = require('cors');

// express app generate
const express = require('express');
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // 모든 라우터에 cors 설정

// 테스트를 위한 API 키
const key = {
    apiKey: 'MBFGP6K-EY2432X-QAB9ZM0-D373WXB',
    uuid: 'a2df0b1a-7784-418b-ba96-9fd068ce3e75',
};

// 테스트를 위한 게시글 데이터
let boardList = [];
let numOfBoard = 0;

// 라우팅 설정
app.get('/', (req, res) => {
    res.send('This is api.js');
});

// 게시글 API
app.get('/board', (req, res) => {
    res.send(boardList);
});

app.post('/board', (req, res) => {
    const board = {
        id: ++numOfBoard,
        user_id: req.body.user_id,
        date: new Date().toDateString(),
        title: req.body.title,
        content: req.body.content,
    };
    boardList.push(board);

    res.redirect('/board');
});

app.put('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id;
    });

    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    // 리스트에 새로운 요소 추가
    const board = {
        id: +req.params.id,
        user_id: req.params.user_id,
        date: new Date().toDateString(),
        title: req.body.title,
        content: req.body.content,
    };
    boardList.push(board);

    res.redirect('/board');
});

app.delete('/board/:id', (req, res) => {
    // req.params.id 값 찾아 리스트에서 삭제
    const findItem = boardList.find((item) => {
        return item.id == +req.params.id;
    });
    const idx = boardList.indexOf(findItem);
    boardList.splice(idx, 1);

    res.redirect('/board');
});

// 게시글 검색 API using uuid-key
app.get('/board/:apikey/:type', (req, res) => {
    let { type, apikey } = req.params;

    // ?key=value 형식으로 들어온 url 쿼리스트링 파싱
    const queryData = url.parse(req.url, true).query;

    // API 키가 유효한지 확인
    // isAPIKey(apikey) : 서버에서 발급한 적이 있는 키인지 확인
    // check(apikey, key.uuid) : key와 uuid가 짝이 맞는지 확인
    if (uuidAPIkey.isAPIKey(apikey) && uuidAPIkey.check(apikey, key.uuid)) {
        if (type === 'search') {
            // 키워드로 게시글 검색
            const keyword = queryData.keyword;
            const result = boardList.filter((e) => {
                // 키워드가 title에 들어있으면 result에 추가
                return e.title.includes(keyword);
            });
            res.send(result);
        } else if (type === 'user') {
            // 닉네임으로 게시글 검색
            const user_id = queryData.user_id;
            const result = boardList.filter((e) => {
                // 쿼리 스트링의 user_id가 boardList의 user_id와 일치하면 추가
                return e.user_id === user_id;
            });
            res.send(result);
        } else {
            res.send('Wrong URL');
        }
    } else {
        res.send('Wrong API Key');
    }
});

// 서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
