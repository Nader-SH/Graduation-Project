import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

class AssistanceType extends Model {}

AssistanceType.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
        assistanceName: { type: DataTypes.BIGINT, allowNull: false },
        donerId: { type: DataTypes.BIGINT, allowNull: false },
    },
    { sequelize, modelName: 'assistanceType' }
);

export default AssistanceType;
