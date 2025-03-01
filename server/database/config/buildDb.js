import { sequelize } from '../../models/index.js';
import * as dotenv from "dotenv";
dotenv.config();

const config = {
    development: {
        // your development config
    },
    production: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
};

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const buildDb = async () => {
  await sequelize.sync({ force: true });
};

buildDb();

export default buildDb;