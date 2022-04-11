// 아래 코드를 Promise 패턴으로 변경
// function work(sec, callback) {
//     setTimeout(() => {
//         callback(new Date().toISOString());
//     }, sec*1000);
// };

// work(1, (result) => {
//     console.log('첫번째 작업', result);

//     work(1, (result) => {
//         console.log('두번째 작업', result);
//     });

// });

function work(sec) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toISOString());
        }, sec * 1000);
    });
}

work(1)
    .then((result) => {
        console.log('first work', result);
        return work(1);
    })
    .then((result) => {
        console.log('second work', result);
    });
