import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/config/connection.js';

class Chat extends Model {}

Chat.init(
    {
        id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false },
        receiveId: { type: DataTypes.BIGINT, allowNull: false },
        senderId: { type: DataTypes.BIGINT, allowNull: false },
        chatDate: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: 'chat' }
);

export default Chat;
