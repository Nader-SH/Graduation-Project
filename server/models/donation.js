import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Donor from './donor.js';
import AssistanceType from './assistanceType.js';
import Request from './request.js';

class Donation extends Model {}

Donation.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false, autoIncrement: true },
        typeName: { type: DataTypes.BIGINT, allowNull: true },
        donorId: { type: DataTypes.BIGINT, allowNull: true, references: { model: Donor, key: 'id' } },
        requestId: { type: DataTypes.BIGINT, allowNull: true, references: { model: Request, key: 'id' } },
        assistanceId: { type: DataTypes.BIGINT, allowNull: true, references: { model: AssistanceType, key: 'id' } },
        donationType: { type: DataTypes.STRING, allowNull: true },
        quantity: { type: DataTypes.BIGINT, allowNull: true },
        amount: { type: DataTypes.DECIMAL(8, 2), allowNull: true },
        deliveryMethod: { type: DataTypes.STRING, allowNull: true },
        donationDate: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, modelName: 'Donation', tableName: 'donations' }
);

export default Donation;
