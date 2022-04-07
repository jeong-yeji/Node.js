const fs = require('fs');

// 동기 메소드
console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');

// 실행결과 (항상 같음)
// 시작
// 1번 저를 여러 번 읽어보세요.
// 2번 저를 여러 번 읽어보세요.
// 3번 저를 여러 번 읽어보세요.
// 끝

// readFile() 대신 readFileSync()를 사용했고, 값을 직접 받아옴
// readFileSync()은 이전 작업이 완료되어야 다음 작업을 진행함
// => 백그라운드에서 작업하는동안 메인 스레드는 대기
