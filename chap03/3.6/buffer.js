const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

// from(): 문자열 > 버퍼
const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기 ')];
// concat(): 배열 안에 든 버퍼를 하나로 합침
const buffer2 = Buffer.concat(array);
// toString(): 버퍼 > 문자열
console.log('concat():', buffer2.toString());
// alloc(): 빈 버퍼를 생성. 인수를 넣으면 해당 크기의 버퍼 생성
const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
