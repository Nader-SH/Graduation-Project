import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Requests extends Model {
    id;
    status;
    studentId;
}

Requests.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },
    },
    { sequelize }
);


export {
    Requests, sequelize
}