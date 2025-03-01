import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const { NODE_ENV, DATABASE_URL, DEV_DB_URL } = process.env;
let url;
let ssl = false;
console.log('DATABASE_URL', DATABASE_URL);

let sequelize;

if (NODE_ENV === "development") {
  if (!DEV_DB_URL) {
    throw new Error("Development database URL not configured");
  }
  sequelize = new Sequelize(DEV_DB_URL);
} else if (NODE_ENV === "production") {
  if (!DATABASE_URL) {
    throw new Error("Production database URL not configured");
  }
  sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  throw new Error(`Invalid NODE_ENV: ${NODE_ENV}`);
}

export default sequelize;