import sequelize from '../config/database.js';
import User from './user.js';
import AssistanceType from './assistanceType.js';
import Request from './request.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

// User - Request Relationship
User.hasMany(Request, { foreignKey: 'userId', onDelete: 'CASCADE' });
Request.belongsTo(User, { foreignKey: 'userId' });

// User - Chat Relationship (as sender)
User.hasMany(Chat, { foreignKey: 'senderId', as: 'sentChats', onDelete: 'CASCADE' });
Chat.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });

// User - Chat Relationship (as receiver)
User.hasMany(Chat, { foreignKey: 'receiveId', as: 'receivedChats', onDelete: 'CASCADE' });
Chat.belongsTo(User, { foreignKey: 'receiveId', as: 'receiver' });

// Donor - AssistanceType Relationship
Donor.hasMany(AssistanceType, { foreignKey: 'donorId', onDelete: 'CASCADE' });
AssistanceType.belongsTo(Donor, { foreignKey: 'donorId' });

// Donor - Donation Relationship
Donor.hasMany(Donation, { foreignKey: 'donorId', onDelete: 'CASCADE' });
Donation.belongsTo(Donor, { foreignKey: 'donorId' });

// AssistanceType - Donation Relationship
AssistanceType.hasMany(Donation, { foreignKey: 'assistanceId', onDelete: 'CASCADE' });
Donation.belongsTo(AssistanceType, { foreignKey: 'assistanceId' });

// Removed Request - Donation Relationship

// Sync models
const syncModels = async () => {
    try {
        await sequelize.sync({ force: false }); // Set to true to drop tables and recreate
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
};

syncModels();

export {
    sequelize,
    User,
    Request,
    AssistanceType,
    Donor,
    Donation,
    Chat
};