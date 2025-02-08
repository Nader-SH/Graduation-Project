

import sequelize from '../database/config/connection.js';
import User from './user.js';
import Request from './request.js';
import AssistanceType from './AssistanceType.js';
import Donor from './donor.js';
import Donation from './donation.js';
import Chat from './chat.js';

User.hasMany(Request, { foreignKey: 'userId' });
Request.belongsTo(User);

User.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(User, { foreignKey: 'id' });

Donor.hasMany(Chat, { foreignKey: 'senderId' });
Chat.belongsTo(Donor, { foreignKey: 'id' });

Donor.hasMany(AssistanceType, { foreignKey: 'donerId' });
AssistanceType.belongsTo(Donor, { foreignKey: 'id' });

AssistanceType.hasMany(Donation, { foreignKey: 'assistanceId' });
Donation.belongsTo(AssistanceType, { foreignKey: 'id' });

AssistanceType.hasMany(Request, { foreignKey: 'assistanceId' });
Request.belongsTo(AssistanceType, { foreignKey: 'id' });

export { sequelize, User, Request, AssistanceType, Donor, Donation, Chat };