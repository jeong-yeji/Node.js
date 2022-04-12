const http = require('http');

http.createServer((req, res) => {
    // res.writeHead(요청코드, 콘텐츠 타입) : 응답에 대한 정보(헤더)를 기록하는 함수
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Node.js로 서버 만들기</h1>'); // 클라이언트에 보낼 데이터
    res.end('<p>3장 http 모듈 공부 중입니다.</p>'); // 응답을 종료하는 메소드
}).listen(8080); // 2. listening event listener 사용
// 1. listen 메소드에 서버가 연결되면 실행할 콜백 함수 넣기
// .listen(8080, () => {
//     console.log('8080번 포트에서 서버 연결 중 ..');
// });

// listening event listener
server.on('listening', () => {
    console.log('8080번 포트에서 서버 연결 중 ..');
});
// error event listener
// 오류 발생 후 실행할 응답이 없으면 서버는 응답을 계속 기다려서 timeout 오류 발생
server.on('error', () => {
    console.error(error);
});
