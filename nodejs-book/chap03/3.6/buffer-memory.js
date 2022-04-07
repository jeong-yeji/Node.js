const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);
console.log('buffer:', process.memoryUsage().rss);

// 실행결과
// before: 23859200
// buffer: 1024729088

// 메모리에 파일을 모두 올려둔 후 writeFileSync() 수행
// => 많은 메모리 용량 차지
