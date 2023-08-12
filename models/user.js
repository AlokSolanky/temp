const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Product = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncreament: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull:false
    },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
