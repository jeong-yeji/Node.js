// Promise
function workP(sec) {
    // Promise의 instance 반환하고,
    // then에서 반환한 것을 받음
    // instance : 코드에 구현된 객체가 실제 메모리에 할당된 것
    return new Promise((resolve, reject) => {
        // Promise 생성시 넘기는 callback = resolve, reject
        // resolve 동작 완료시 호출, 오류 났을 경우 reject
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

workP(1)
    .then((result) => {
        console.log('첫 번째 작업', result);
        return workP(1);
    })
    .then((result) => {
        console.log('두 번째 작업', result);
    });
