import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const { NODE_ENV, DATABASE_URL, DEV_DB_URL } = process.env;
let url;
let ssl = false;
console.log('DATABASE_URL', DATABASE_URL);
switch (NODE_ENV) {
  case "development":
    url = DATABASE_URL;
    console.log(url + "---- for Development");
    break;
  default:
    throw new Error("NODE_ENV is not set to any url");
}

if (!url) throw new Error("There is no Url Found");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

export default sequelize;