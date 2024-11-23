import { sequelize } from '../../models/index.js';

const buildDb = async () => {
  await sequelize.sync({ force: true });
};

buildDb();

export default buildDb;