const fs = require('fs').promises;
// 프로미스의 에러는 catch하지 않아도 알아서 처리됨
// 하지만 버전에 따라 바뀔 수 있으므로 catch 사용 권장
setInterval(() => {
    fs.unlink('./abcdefg.js');
}, 1000);
