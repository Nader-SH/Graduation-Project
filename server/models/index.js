import sequelize from '../config/database.js';
import User from './user.js';
import AssistanceType from './assistanceType.js';
import Request from './request.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

// Define associations
User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(User, { foreignKey: 'senderId' });

Donor.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(Donor, { foreignKey: 'senderId' });

Donor.hasMany(AssistanceType, { foreignKey: 'donorId' });
AssistanceType.belongsTo(Donor, { foreignKey: 'donorId' });

AssistanceType.hasMany(Donation, { foreignKey: 'assistanceTypeId' });
Donation.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });

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

export { sequelize, User, Request, AssistanceType, Donor, Donation, Chat };