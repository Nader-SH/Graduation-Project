import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, DATABASE_URL, DATABASE_URL_PRODUCTION } = process.env;

let sequelize;

if (NODE_ENV === 'production') {
    sequelize = new Sequelize(DATABASE_URL_PRODUCTION, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Development connection
    sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        logging: false, // Set to console.log to see SQL queries
    });
}

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

export default sequelize;