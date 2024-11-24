import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class SectionStatus extends Model {
    id;
    status;
    sectionId;
    studentId;
}

SectionStatus.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize }
);


export {
    SectionStatus, sequelize
}