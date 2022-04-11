// async/await 예외처리 1
// 오류가 발생하지 않으면 resolved 프로퍼티 반환
async function myAsyncFunc() {
    return 'done';
}

const result = myAsyncFunc();
console.log(result);
