// closure : 내부 함수가 외부 함수의 스코프에 접근할 수 있는 것
// inner()의 scope가 outer()의 scope를 참조하고 있고
// outer()의 실행이 끝나고 소멸된 이후에도
// inner()가 outer()의 scope에 접근할 수 있는 것

function outer() {
    var a = 'A';
    var b = 'B';

    function inner() {
        var a = 'AA';
        console.log(b);
    }

    return inner;
}

var outerFunc = outer();
outerFunc(); // B
