module.exports = (sequelize, DataTypes) => {
    const newCustomer = sequelize.define(
        // 테이블 이름
        'new_customer',
        {
            // 컬럼 생성
            // id는 interger, allowNull, primaryKey, autoincrement 옵션이 일반적이라 sequelize에서 자동 생성
            name: {
                type: DataTypes.STRING(20), // 데이터 타입 정의
                allowNull: false, // null 허용 여부 정의
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sex: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            joined_date: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'), // 기본값 지정
                allowNull: false,
            },
        },
        {
            timestamps: false, // createdAt, updatedAt 열 추가 여부
        }
    );
    return newCustomer;
};
