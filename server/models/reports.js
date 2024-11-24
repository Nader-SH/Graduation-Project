import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Reports extends Model {
    id;
    description;
    courseId;
    studentId;
    sectionId;
}

Reports.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },
    { sequelize }
);


export {
    Reports, sequelize
}