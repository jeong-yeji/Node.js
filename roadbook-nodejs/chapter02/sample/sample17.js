// 콜백 함수의 비동기 처리
setTimeout(() => {
    console.log('todo: first work');
}, 3000);

setTimeout(() => {
    console.log('todo: second work');
}, 2000);

// todo: second work
// todo: first work
