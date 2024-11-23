import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const { NODE_ENV, DATABASE_URL, DEV_DB_URL } = process.env;
let url;
let ssl = false;
switch (NODE_ENV) {
  case "production":
    url = DATABASE_URL;
    ssl = {
      rejectUnauthorized: false,
    };
    console.log(url + " ----- for Production");
    break;
  case "development":
    url = DEV_DB_URL;
    console.log(url + "---- for Development");
    break;
  default:
    throw new Error("NODE_ENV is not set to any url");
}

if (!url) throw new Error("There is no Url Found");

const sequelize = new Sequelize(process.env.DEV_DB_URL, {
  dialect: "postgres",
});

export default sequelize;