import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {}

User.init({
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['volunteer', 'admin']]
        }
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
        set(value) {
            // If type is admin, force status to be approved
            if (this.type === 'admin') {
                this.setDataValue('status', 'approved');
            } else {
                this.setDataValue('status', value);
            }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
        beforeCreate: (user) => {
            // Set status to approved if type is admin
            if (user.type === 'admin') {
                user.status = 'approved';
                user.role = 'admin';
            }
        }
    }
});

export default User;
