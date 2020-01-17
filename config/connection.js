var Sequelize = require("sequelize");
var path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

var sequelize = new Sequelize("meetapp", "root", process.env.DB_PASSWORD, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

(async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
