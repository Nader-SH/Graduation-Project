import sequelize from '../database/config/connection.js';
import User from './user.js';
import Request from './request.js';
import AssistanceType from './assistanceType.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

// User - Request association
User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User, { foreignKey: 'userId' });

// User - Chat association
User.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(User, { foreignKey: 'senderId' });

// Donor - Chat association
Donor.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(Donor, { foreignKey: 'senderId' });

// Donor - AssistanceType association
Donor.hasMany(AssistanceType, { foreignKey: 'donorId' });
AssistanceType.belongsTo(Donor, { foreignKey: 'donorId' });

// AssistanceType - Donation association
AssistanceType.hasMany(Donation, { foreignKey: 'assistanceTypeId' });
Donation.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });

// AssistanceType - Request association
AssistanceType.hasMany(Request, { foreignKey: 'assistanceTypeId' });
Request.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });

export { sequelize, User, Request, AssistanceType, Donor, Donation, Chat };