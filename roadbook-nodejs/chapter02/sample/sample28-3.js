// async/await 예외처리 3
// try-catch문 또는 .catch() 이용
function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('throw Error!');
        }, sec * 1000);
    });
}

async function myAsyncFunc() {
    console.log(new Date());
    try {
        await wait(2);
    } catch (e) {
        console.error(e);
    }
    console.log(new Date());
}

const result = myAsyncFunc();

// .catch() 사용시 주의할 점
// wait 함수가 resolve할 때는 catch하지 않음 -> result에 wait의 resolve가 들어감
// => wait가 reject할 때 catch에서는 아무것도 반환하지 않으므로 result는 undefined됨
