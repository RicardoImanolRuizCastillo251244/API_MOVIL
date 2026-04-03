const { Op } = require("sequelize");
const { models } = require("../models");
const { DeviceToken } = models;

async function upsertToken({ usuarioId, token, platform }) {
  const now = new Date();
  const existing = await DeviceToken.findOne({ where: { token } });

  if (existing) {
    await existing.update({ usuarioId, platform, isActive: true, lastSeenAt: now });
    return existing;
  }

  return DeviceToken.create({
    usuarioId,
    token,
    platform,
    isActive: true,
    lastSeenAt: now
  });
}

async function getActiveTokensByUsuarioId(usuarioId) {
  return DeviceToken.findAll({
    where: { usuarioId, isActive: true },
    order: [["updatedAt", "DESC"]]
  });
}

async function deactivateByTokens(tokens) {
  if (!tokens || tokens.length === 0) return 0;
  const [affected] = await DeviceToken.update(
    { isActive: false },
    { where: { token: { [Op.in]: tokens } } }
  );
  return affected;
}

module.exports = {
  upsertToken,
  getActiveTokensByUsuarioId,
  deactivateByTokens
};

