// uuid-apikey : db없이 메모리로 api key를 관리해주는 모듈
// 실무에서 적용은 힘들지만, 보안이 중요하지 않거나 트래픽이 많지 않은 서버에서는 이용 가능
const uuidAPIkey = require('uuid-apikey');
console.log(uuidAPIkey.create());
