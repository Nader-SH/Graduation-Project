import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Donation extends Model {}

Donation.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    donationType: {
        type: DataTypes.ENUM('one-time', 'monthly', 'quarterly', 'yearly'),
        allowNull: false,
        defaultValue: 'one-time'
    },
    paymentMethod: {
        type: DataTypes.ENUM('credit_card', 'bank_transfer', 'cash', 'other'),
        allowNull: false
    },
    donorName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    donorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    donorPhone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },
    donationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    timestamps: true
});

export default Donation;
