const fs = require('fs');

// node 명령을 실행하는 콘솔 기준으로 위치 지정
fs.readFile('./readme.txt', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data); // readFile()은 Buffer 형식으로 제공됨
    console.log(data.toString());
});
