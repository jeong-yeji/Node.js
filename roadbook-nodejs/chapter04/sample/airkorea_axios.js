// Open API 활용 2 - axios
// axios의 장점
// 1. axios는 Promise를 반환하고, async/await까지 사용 가능
// 2. 구형 브라우저 지원
// 3. 요청 중단 가능
// 4. 응답 시간 초과 설정 가능
// 5. CSRF 보호 기능 내장
// 6. JSON 형식으로 자동 변환 가능

// case1. axios(url, [, config])
// case2. axios(config)
// case3. axios.method(url[, data[, config]])

const axios = require('axios');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const app = express();

// 포트 설정
app.set('port', process.env.PORT || 8080);

// 공통 미들웨어
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우팅 설정
app.get('/airkorea', async (req, res) => {
    const serviceKey = process.env.airServiceKey;
    const airUrl =
        'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?';

    let parmas = encodeURI('serviceKey') + '=' + serviceKey;
    parmas += '&' + encodeURI('numOfRows') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('pageNo') + '=' + encodeURI('1');
    parmas += '&' + encodeURI('dataTerm') + '=' + encodeURI('DAILY');
    parmas += '&' + encodeURI('ver') + '=' + encodeURI('1.3');
    parmas += '&' + encodeURI('stationName') + '=' + encodeURI('마포구');
    parmas += '&' + encodeURI('returnType') + '=' + encodeURI('json');

    const url = airUrl + parmas; // 옵션, 파라미터 등 한꺼번에 url로 연결

    try {
        const result = await axios.get(url);
        res.json(result.data); // axios로 받은 결과는 꼭 뒤에 .data를 붙여줘야됨!
    } catch (error) {
        console.error(error);
    }
});

// 서버와 포트 연결
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
