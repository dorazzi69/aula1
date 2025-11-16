const Sequelize = require('sequelize');
const sequelize = require('./config/database');

const User = require('./models/user')(sequelize);
const Product = require('./models/product')(sequelize);
const Feedback = require('./models/feedback')(sequelize);

User.hasMany(Feedback, { foreignKey: 'userId', as: 'feedbacks', onDelete: 'CASCADE' });
Feedback.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Feedback, { foreignKey: 'productId', as: 'feedbacks', onDelete: 'CASCADE' });
Feedback.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Product,
  Feedback
};
