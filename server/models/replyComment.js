import { Model, DataTypes } from 'sequelize';
import sequelize from "../database/config/connection.js";

export default class ReplyComment extends Model {
    id;
    content;
    commentId;
}

ReplyComment.init(
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
        },
    },
    { sequelize }
);


export {
    ReplyComment, sequelize
}