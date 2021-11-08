// process.nextTick() : 이벤트 루프가 다른 콜백 함수보다 nextTick의 콜백 함수를 우선으로 처리하도록 만듦
setImmediate(() => {
    console.log('immediate');
});
process.nextTick(() => {
    console.log('nextTick');
});
setTimeout(() => {
    console.log('timeout');
}, 0);
// resolve된 Promise도 다른 콜백들보다 우선시 됨
Promise.resolve().then(() => console.log('promise'));

// 마이크로태스크(microtask) : process.nextTick(), resolve 된 Promise
// microtask를 재귀 호출하게 되면
// 이벤트 루프는 다른 콜백 함수보다 microtask를 우선하여 처리함
// => 콜백 함수들이 실행되지 않을 수 있음!

// 실행 결과
// nextTick
// promise
// timeout
// immediate
