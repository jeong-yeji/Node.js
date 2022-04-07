const fs = require('fs');

// watch() : 폴더나 파일의 변경 사항 감시. rename 후에는 수행되지 않음
fs.watch('./target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});
