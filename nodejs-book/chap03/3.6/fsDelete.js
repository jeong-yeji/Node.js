const fs = require('fs').promises;

fs.readdir('./folder') // 폴더 안 내용 확인
    .then((dir) => {
        console.log('폴더 내용 확인', dir);
        return fs.unlink('./folder/newfile.js'); // 파일 삭제
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./folder'); // 파일이 없는 폴더 삭제
    })
    .then(() => {
        console.log('폴더 삭제 성공');
    })
    .catch((err) => {
        console.error(err);
    });
