import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Courses extends Model {
    id;
    title;
    sectionsNumber;
    display;
    displayAdmin;
    categorieId;
    userId;
}

Courses.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        display: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: false,
        },
        displayAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            unique: true,
        }
    },
    { sequelize }
);


export {
    Courses, sequelize
}