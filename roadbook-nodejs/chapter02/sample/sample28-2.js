// async/await 예외처리 2
// Promise와 동일하게 예외 처리
async function myAsyncFunc() {
    throw 'myAsyncFunc Error!';
}

function myPromiseFunc() {
    return new Promise((resolve, reject) => {
        reject('myPromiseFunc Error!');
    });
}

const result1 = myAsyncFunc().catch((e) => {
    console.log(e);
});
const result2 = myPromiseFunc().catch((e) => {
    console.log(e);
});
