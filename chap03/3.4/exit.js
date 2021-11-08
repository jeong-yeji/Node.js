let i = 1;
setInterval(() => {
    if (i == 5) {
        console.log('종료!');
        process.exit();
    }
    console.log(i);
    i += 1;
}, 1000);

// process.exit(0) : 정상 종료
// process.exit(1) : 비정상 종료 -> 에러가 발생해서 종료할 때 사용
