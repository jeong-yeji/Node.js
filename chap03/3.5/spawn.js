const spawn = require('child_process').spawn;

// spawn(명령어, [옵션 배열]) : 새로운 프로세스를 띄우면서 명령어 실행. 세번째 인수로 { shell: true }를 주면 exec처럼 셸을 실행해서 명령어 수행
const process = spawn('python', ['test.py']);

process.stdout.on('data', function (data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function (data) {
    console.error(data.toString());
}); // 실행 에러
