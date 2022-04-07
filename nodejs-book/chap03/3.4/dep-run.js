const dep1 = require('./dep1');
const dep2 = require('./dep2');
dep1();
dep2();

// dep1의 module.exports가 함수가 아니라 빈 객체로 표시됨
// => 순환 참조(Circular Dependency)
// 순환 참조 발생 시, 순환 참조되는 대상을 빈 객체로 만듦
// 에러가 발생하지 않고 바뀌기 때문에 주의!!

// 실행 결과
// require dep1 {}
// require dep2 [Function (anonymous)]
// dep2 [Function (anonymous)]
// dep1 {}
// (node:11484) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
// (Use `node --trace-warnings ...` to show where the warning was created)
// (node:11484) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'Symbol(Symbol.iterator)' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'Symbol(nodejs.util.inspect.custom)' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'constructor' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'Symbol(Symbol.toStringTag)' of module exports inside circular dependency
// (node:11484) Warning: Accessing non-existent property 'Symbol(Symbol.iterator)' of module exports inside circular dependency
