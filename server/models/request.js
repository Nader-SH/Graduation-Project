import { DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

const Request = sequelize.define('requests', {
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
        type: DataTypes.STRING,
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    assistanceTypeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'assistanceTypes',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

export default Request;
