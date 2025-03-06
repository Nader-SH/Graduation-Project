import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';
import Donor from './donor.js';
import AssistanceType from './assistanceType.js';

class Donation extends Model {}

Donation.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
        typeName: { type: DataTypes.BIGINT, allowNull: false },
        donorId: { type: DataTypes.BIGINT, allowNull: false, references: { model: Donor, key: 'id' } },
        requestId: { type: DataTypes.BIGINT, allowNull: false, references: { model: Request, key: 'id' } },
        assistanceId: { type: DataTypes.BIGINT, allowNull: false, references: { model: AssistanceType, key: 'id' } },
        donationType: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.BIGINT, allowNull: false },
        amount: { type: DataTypes.DECIMAL(8, 2), allowNull: false },
        deliveryMethod: { type: DataTypes.STRING, allowNull: false },
        donationDate: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'donations' }
);

export default Donation;
