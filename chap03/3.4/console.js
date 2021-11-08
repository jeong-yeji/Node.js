const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside: {
        inside: {
            key: 'value',
        },
    },
};

console.time('전체 시간');
console.log('평범한 로그. 쉼표로 구분해 여러 값 출력 가능');
console.log(string, number, boolean);
console.error('에러 메시지');

console.table([
    { name: '제로', birth: 1994 },
    { name: 'hero', birth: 1988 },
]);

// dir() : 객체를 표현할 때 사용
// colors : 색을 추가하여 가독성 좋게 설정
// depth : 몇 단계까지 보여줄지 설정 default 2
console.dir(obj, { colors: false, depth: 2 });
console.dir(obj, { colors: true, depth: 1 });

// time() : 같은 레이블을 가진 time-timeEnd 사이의 시간 측정
console.time('시간 측정');
for (let i = 0; i < 100000; i++) {}
console.timeEnd('시간 측정');

// trace() : 에러 위치를 알려주지 않을 때 에러 발생 위치를 추적하기 위해 사용
function b() {
    console.trace('에러 위치 추적');
}
function a() {
    b();
}
a();

console.timeEnd('전체 시간');
