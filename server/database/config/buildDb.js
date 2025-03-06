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

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

export default syncDatabase;