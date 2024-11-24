import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class Comments extends Model {
    id;
    content;
    sectionId;
    studentId;
}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        }
    },
    { sequelize }
);


export {
    Comments, sequelize
}