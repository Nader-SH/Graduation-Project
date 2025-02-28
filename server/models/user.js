import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

class User extends Model {}

User.init(
    {
        id: { 
            type: DataTypes.BIGINT, 
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false 
        },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { 
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        password: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        image: { type: DataTypes.STRING, allowNull: false },
    },
    { 
        sequelize, 
        modelName: 'user',
        timestamps: true
    }
);

export default User;
