import { DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

const AssistanceType = sequelize.define('assistanceTypes', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  donorId: {
    type: DataTypes.BIGINT,
    references: {
      model: 'donors',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

export default AssistanceType;
