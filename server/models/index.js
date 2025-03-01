import sequelize from '../database/config/connection.js';
import User from './user.js';
import AssistanceType from './assistanceType.js';
import Request from './request.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

// Force sync all models in the correct order
const syncModels = async () => {
    try {
        // First, sync independent models
        await User.sync();
        await Donor.sync();

        // Then sync AssistanceType which depends on Donor
        await AssistanceType.sync();

        // Then sync models that depend on AssistanceType
        await Request.sync();
        await Donation.sync();
        await Chat.sync();
    } catch (error) {
        console.error('Error syncing models:', error);
        throw error;
    }
};

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

AssistanceType.hasMany(Request, { foreignKey: 'assistanceTypeId' });
Request.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });

// Sync models
await syncModels();

export { sequelize, User, Request, AssistanceType, Donor, Donation, Chat };