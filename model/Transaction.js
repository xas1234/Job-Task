const Sequelize = require("sequelize");

const database = require("./database");

const Transaction = database.define("transactions", {
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  currency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  client_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});
Transaction.sync().then(() => {
  console.log("table created");
});
module.exports = Transaction;
