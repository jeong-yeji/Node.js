// OS별로 경로 구분자가 다르기 때문에 모듈 사용

const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep); // 경로 구분자
console.log('path.delimiter:', path.delimiter); // 환경변수 구분자

console.log('--------------------------------------');

console.log('path.dirname():', path.dirname(string)); // 파일 경로
console.log('path.extname():', path.extname(string)); // 파일 확장자

// 파일 이름과 확장자 표시. 이름만 표시하려면 두번째 인수로 파일의 확장자 넣으면 됨
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));

console.log('--------------------------------------');

console.log('path.parse()', path.parse(string)); // 파일 경로를 root, dir, base, ext, name으로 분리
console.log(
    'path.format():', // parse한 경로를 합침
    path.format({
        dir: 'C:\\Users\\jeongyeji',
        name: 'path',
        ext: '.js',
    })
);
console.log('path.normalize():', path.normalize('C://Uesrs\\\\jeongyeji\\path.js')); // /나 \를 여러번 사용했을 때 올바르게 변환

console.log('--------------------------------------');

// 절대경로/상대경로 구분
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));

console.log('--------------------------------------');

console.log('path.relative():', path.relative('C:\\Users\\jeongyeji\\path.js', 'C:\\')); // 첫번째 경로에서 두번째 경로로 가는 방법 알려줌

// 여러 경로를 하나로 합침
// join() : /를 만나면 상대 경로로 처리
// resolve() : /를 절대경로로 인식해서 앞의 경로 무시
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/jeongyeji')); // C:\Users\jyj24\Documents\nodejs\users\jeongyeji
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/jeongyeji')); // C:\jeongyeji
