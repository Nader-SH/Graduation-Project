import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Donor extends Model {}

Donor.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        phone: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize, modelName: 'Donor', tableName: 'donors' }
);

export default Donor;
