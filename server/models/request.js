import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Request extends Model {}

Request.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    applicantName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationalId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    familyMembersCount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    headOfFamilyStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assistanceType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    donationAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'Request',
    timestamps: true
});

export default Request;
