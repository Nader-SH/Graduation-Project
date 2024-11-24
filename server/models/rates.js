import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Rates extends Model {
    id;
    rate;
    studentId;
    courseId;
}

Rates.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
        }
    },
    { sequelize }
);


export {
    Rates, sequelize
}