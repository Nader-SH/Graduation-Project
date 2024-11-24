import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class FavoriteCourses extends Model {
    id;
    courseId;
    studentId;
}

FavoriteCourses.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    },
    { sequelize }
);


export {
    FavoriteCourses, sequelize
}