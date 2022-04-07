const fs = require('fs');

// 비동기 메소드
console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log('3번', data.toString());
});
console.log('끝');

// 실행결과(시작과 끝을 제외하고 순서는 매번 달라짐)
// 시작
// 끝
// 2번 저를 여러 번 읽어보세요.
// 1번 저를 여러 번 읽어보세요.
// 3번 저를 여러 번 읽어보세요.

// 비동기 메소드는 백그라운드에 해당 파일을 읽으라고만 요청하고 다음 작업으로 넘어감
// 시작 > 파일 읽기 요청 3번 > 끝
// 읽기 완료되면 백그라운드가 메인 스레드에 알려서 등록됨 콜백함수 실행
