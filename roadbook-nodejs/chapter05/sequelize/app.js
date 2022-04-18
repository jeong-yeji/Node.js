const { sequelize } = require('./models/index.js');

const driver = () => {
    sequelize
        .sync() // 테이블 생성
        .then(() => {
            // sequelize는 promise를 반환하므로 then을 이용해 초기화
            console.log('초기화 완료');
        })
        .catch((err) => {
            console.error('초기화 실패');
            console.error(err);
        });
};
driver();
