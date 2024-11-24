import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Sections extends Model {
    id;
    order;
    title;
    description;
    courseId;
}

Sections.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },
    { sequelize }
);


export {
    Sections, sequelize
}