const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
    console.log('stream:', process.memoryUsage().rss);
});

// 실행 결과
// before: 23941120
// stream: 54202368

// 큰 조각을 조각내어 버퍼 단위로 옮김
// => 버퍼를 사용하는 것보다 스트림을 사용할 때 적은 메모리 용량 차지
