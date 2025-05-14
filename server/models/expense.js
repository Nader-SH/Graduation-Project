import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class Expense extends Model {}

Expense.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    requestId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: 'Requests',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    expenseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'completed'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses',
    timestamps: true
});

export default Expense; 