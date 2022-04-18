const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 간 관계 설정
db.newCustomer = require('./customer')(sequelize, Sequelize);
db.newPurchase = require('./purchse')(sequelize, Sequelize);

db.newCustomer.hasMany(db.newPurchase, {
    foreignKey: 'customer_id',
    sourceKey: 'id',
}); // 1:N
db.newPurchase.belongsTo(db.newCustomer, {
    foreignKey: 'customer_id',
    sourceKey: 'id',
}); // 1:1

module.exports = db;
