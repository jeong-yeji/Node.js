const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category')); // 키에 해당하는 모든 값
console.log('searchParams.get():', myURL.searchParams.get('limit')); // 키에 해당하는 첫번째 값
console.log('searchParams.has():', myURL.searchParams.has('page')); // 해당 키가 있는지 없는지

console.log('searchParams.keys():', myURL.searchParams.keys()); // 모든 키를 iterator(ES2015문법) 객체로 가져옴
console.log('searchParams.values():', myURL.searchParams.values()); // 모든 값을 iterator(ES2015문법) 객체로 가져옴

// append(key, value) : 해당 키 추가. 같은 키가 있다면 유지하고 하나 더 추가
myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

// set(key, value) : 같은 키의 값을 모두 지우고 새로 추가
myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

// delete(key) : 해당 키 제거
myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

// toString() : 조작한 searchParams 객체를 다시 문자열로 만듦
console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
