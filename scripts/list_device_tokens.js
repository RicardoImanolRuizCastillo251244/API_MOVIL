require('dotenv').config();
const { sequelize, models } = require('../src/models');

async function list() {
  try {
    await sequelize.authenticate();
    const tokens = await models.DeviceToken.findAll({ order: [['updatedAt', 'DESC']] });
    console.log('device_tokens:');
    tokens.forEach(t => {
      console.log({ id: t.id, usuarioId: t.usuarioId, token: t.token, platform: t.platform, isActive: t.isActive, lastSeenAt: t.lastSeenAt });
    });
    process.exit(0);
  } catch (err) {
    console.error('Error listing device tokens:', err.message);
    process.exit(1);
  }
}

list();
