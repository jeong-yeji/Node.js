const crypto = require('crypto');

// 암호화
// randomBytes() : 64바이트 길이의 문자열 만듦
// pbkdf2(비밀번호, salt, 반복횟수, 출력바이트, 해시 알고리즘)

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString('base64');
    console.log('salt:', salt);
    crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
        console.log('password:', key.toString('base64'));
    });
});
