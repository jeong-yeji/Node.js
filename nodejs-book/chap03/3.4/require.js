console.log('require가 맨 위에 오지 않아도 됨');
console.log('exports가 맨 밑에 오지 않아도 됨');

module.exports = '저를 찾아보세요';

require('./var');

console.log('require.cache 입니다');
console.log(require.cache);

// require.main : 노드 실행 시 첫 모듈
// node require로 실행하면 require.main == require.js
console.log('require.main 입니다');
console.log(require.main == module);
console.log(require.main.filename); // 첫 모듈의 이름 출력
