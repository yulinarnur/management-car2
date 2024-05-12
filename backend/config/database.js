import { Sequelize } from "sequelize";

const db = new Sequelize("manage_car_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
