import sequelize from '../database/config/connection.js';
import User from './user.js';
import AssistanceType from './assistanceType.js';
import Request from './request.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

// Define associations in correct order
// First, create tables without dependencies
User.sync();
Donor.sync();

// Then create AssistanceType which depends on Donor
AssistanceType.belongsTo(Donor, { foreignKey: 'donorId' });
Donor.hasMany(AssistanceType, { foreignKey: 'donorId' });
AssistanceType.sync();

// Then create tables that depend on AssistanceType
Request.belongsTo(User, { foreignKey: 'userId' });
Request.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });
User.hasMany(Request, { foreignKey: 'userId' });
AssistanceType.hasMany(Request, { foreignKey: 'assistanceTypeId' });
Request.sync();

Donation.belongsTo(AssistanceType, { foreignKey: 'assistanceTypeId' });
AssistanceType.hasMany(Donation, { foreignKey: 'assistanceTypeId' });
Donation.sync();

// Finally, create Chat which depends on both User and Donor
Chat.belongsTo(User, { foreignKey: 'senderId' });
Chat.belongsTo(Donor, { foreignKey: 'senderId' });
User.hasMany(Chat, { foreignKey: 'senderId' });
Donor.hasMany(Chat, { foreignKey: 'senderId' });
Chat.sync();

export { sequelize, User, Request, AssistanceType, Donor, Donation, Chat };