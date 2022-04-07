const crypto = require('crypto');

// 암호화
const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyz123456'; // 32바이트
const iv = '1234567890123456'; // 16바이트
const cipher = crypto.createCipheriv(algorithm, key, iv);

// cipher.update(문자열, 인코딩, 출력 인코딩)
let result = cipher.update('암호화할 문장', 'utf8', 'base64');
// cipher.final(출력 인코딩)
result += cipher.final('base64');
console.log('암호화:', result);

// 복호화. 암호화할 때 사용한 알고리즘, 키, iv 그대로 사용해야됨
const decipher = crypto.createDecipheriv(algorithm, key, iv);

// 복호화기 때문에 암호화 때 썼던 반대로 base64, utf8
let result2 = decipher.update(result, 'base64', 'utf8');
result2 += decipher.final('utf8');
console.log('복호화:', result2);
