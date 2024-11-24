import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Companys extends Model {
    id;
    link;
    name;
    image;
}

Companys.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    { sequelize }
);


export {
    Companys, sequelize
}