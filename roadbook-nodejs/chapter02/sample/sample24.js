// async/await
function workP(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('workP Function');
        }, sec * 1000);
    });
}

async function asyncFunc() {
    // await가 붙은 함수가 완료되기 전까지 밑의 구문은 실행하지 않음
    const result_workP = await workP(3);
    console.log(result_workP);
    return 'async function';
}

asyncFunc().then((result) => {
    console.log(result);
});

// 비동기로 처리하고 싶은 함수에 async를 붙이고,
// 비동기 처리를 할 특정 부분에 await를 붙임
