const fs = require('fs');

// highWaterMark : 바이트 단위로 버퍼의 크기를 지정하는 속성. dafault 64
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

// data에 chunck를 push
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data :', chunk, chunk.length);
});
// 버퍼를 합쳐서 문자열로 만들기
readStream.on('end', () => {
    console.log('end :', Buffer.concat(data).toString());
});
// 에러 발생시 처리
readStream.on('error', (err) => {
    console.log('error :', err);
});
