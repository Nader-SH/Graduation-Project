import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Categories extends Model {
    id;
    title;
}

Categories.init(
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
    },
    { sequelize }
);


export {
    Categories, sequelize
}