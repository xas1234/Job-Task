const Sequelize = require("sequelize");

const sequelize = new Sequelize("mydb", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
});

module.exports = sequelize;
