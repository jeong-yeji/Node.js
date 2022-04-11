// 비동기 상황에서의 예외 처리

function wait(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error!');
        }, sec * 1000);
    });
}

// 1. Promise의 .catch() 이용
wait(3).catch((e) => {
    console.log('1st catch ', e);
});

// chain은 같은 객체를 반환할 때만 가능
wait(3)
    .catch((e) => {
        console.log('2nd catch ', e);
    }) // wait 함수의 오류를 받음
    .catch((e) => {
        console.log('3rd catch ', e);
    }); // 위 catch 구문의 상태를 받음. 오류를 잘 받았으므로 오류가 발생하지 않음

// chain 사용하고자 할 때
wait(3)
    .catch((e) => {
        console.log('4th catch ', e);
        throw e; // 이 오류를 발생시키기
    })
    .catch((e) => {
        console.log('5th catch ', e);
    }); // 위 catch 구문을 오류를 받아서 실행

// 2. Promise의 .then() 이용
wait(3).then(
    () => {
        console.log('success'); // 성공했을 때
    },
    (e) => {
        console.log('catch in then ', e); // 실패했을 때
    }
);
