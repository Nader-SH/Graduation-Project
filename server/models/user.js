import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class User extends Model {
    id;
    firstName;
    lastName;
    email;
    password;
    image;
    type;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: '',
            allowNull: true,
        },
        type: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize }
);


export {
    User, sequelize
}