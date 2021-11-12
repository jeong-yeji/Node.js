const fs = require('fs');
// 에러는 발생하지만, 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않음
setInterval(() => {
    fs.unlink('./abcdefg.js', (err) => {
        if (err) {
            console.error(err);
        }
    });
}, 1000);
