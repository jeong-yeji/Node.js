// 동기적 처리 1
function work(sec, callback) {
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec * 1000);
}

work(1, (result) => {
    console.log('첫 번째 작업', result);

    work(1, (result) => {
        console.log('두 번째 작업', result);

        work(1, (result) => {
            console.log('세 번째 작업', result);
        });
    });
});

// 세 작업이 1초의 간격을 두고 1>2>3 순으로 순차적으로 처리됨
