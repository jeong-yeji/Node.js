const http = require('http');

http.createServer((req, res) => {
    // writeHead(성공임을 뜯하는 200, 응답에 대한 정보를 보내는 콘텐츠의 형식): 응답에 대한 정보를 기록하는 메소드
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    // write(data)
    res.write('<h1>Hello Node!</h1>');
    // end(data): 응답을 종료하는 메소드
    res.end('<p>Hello Server!</p>');
})
    // 서버 연결
    .listen(8080, (/* 포트 연결 완료 후 실행될 콜백 함수 */) => {
        console.log('8080번 포트에서 서버 대기 중입니다.');
    });
