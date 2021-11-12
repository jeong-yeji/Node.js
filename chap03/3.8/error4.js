// 실행 후 1초만에 setInterval에서 에러가 발생해서 프로미스가 멈추므로 setTimeout이 실행되지 않음
// => uncaughtException 이벤트 리스너를 통해서 에러 처리
process.on('uncaughtException', (err) => {
    console.error('예기치 못한 에러', err);
});

setInterval(() => {
    throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
    console.log('실행됩니다');
}, 2000);
