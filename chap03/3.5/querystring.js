const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse():', query); // url의 query 부분을 js 객체로 분해
console.log('querystring.stringify():', querystring.stringify(query)); // 분해된 query 객체를 문자열로 다시 조립
