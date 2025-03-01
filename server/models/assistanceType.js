import { DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

const AssistanceType = sequelize.define('AssistanceType', {
  id: {
    type: DataTypes.INTEGER,
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
  }
}, {
  timestamps: true
});

export default AssistanceType;
