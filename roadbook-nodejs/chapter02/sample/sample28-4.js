// async/await 예외처리 4
async function myAsyncFunc() {
    consoleasf.log(new Date());
    const result = await wait(2).catch((e) => {
        console.error(e);
    });
    console.log(new Date());
}

// try-catch문은 반환하는 Promise에 대한 오류만 잡음
try {
    myAsyncFunc();
} catch (e) {}
// .catch()문을 이용해 오타나 문법 오류 잡기
myAsyncFunc().catch(e);
