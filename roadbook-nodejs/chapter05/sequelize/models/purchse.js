module.exports = (sequelize, DataTypes) => {
    const newPurchase = sequelize.define(
        'new_purchase',
        {
            customer_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            book_name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            purchase_date: {
                type: 'TIMESTAMP',
                defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        },
        {
            // freezeTableName: sequelize는 모델명을 단수로, 테이블명을 복수로 만듦
            // ex. purchase 모델을 만들었으면, purchases 테이블을 만들어 모델 매핑
            // 복수로 만들지 않아도 되는 모델이 있는 경우 true로 지정
            freezeTableName: true,
            timestamps: false,
        }
    );
    return newPurchase;
};
