// 콜백 함수의 동기 처리
setTimeout(() => {
    setTimeout(() => {
        console.log('todo: second work');
    }, 2000);
    console.log('todo: first work');
}, 3000);

// todo: first work
// todo: second work
