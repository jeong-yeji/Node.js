// Promise 객체와 async/await
// 1. Promise로 구현된 함수
function workP(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

// 2. 일반 함수
function justFunc() {
    return 'just Function';
}

// 3. async를 사용한 함수 : Promise 객체를 반환
async function asyncFunc() {
    return 'async Function';
}

console.log(justFunc());
console.log(asyncFunc());
console.log(workP());
