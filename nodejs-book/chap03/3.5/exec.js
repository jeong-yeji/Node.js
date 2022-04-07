const exec = require('child_process').exec;

// exec(명령어) : 셸을 실행해서 명령어 수행
const process = exec('dir');

process.stdout.on('data', function (data) {
    console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function (data) {
    console.error(data.toString());
}); // 실행 에러
