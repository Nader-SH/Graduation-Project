import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class User extends Model {
    id;
    user_name;
    email;
    password;
    user_image;
    have_businesses;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_image: {
            type: DataTypes.STRING,
            defaultValue: 'UserOutlined',// UserOutlined is a antd avatar img
        },
        have_businesses: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize }
);


export {
    User, sequelize
}