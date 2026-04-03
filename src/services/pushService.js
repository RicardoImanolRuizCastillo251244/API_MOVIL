const admin = require("firebase-admin");
const deviceTokenRepo = require("../repositories/deviceTokenRepository");

function parseServiceAccountFromEnv() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function ensureFirebaseInitialized() {
  if (admin.apps.length > 0) return true;

  const serviceAccount = parseServiceAccountFromEnv();
  if (!serviceAccount) return false;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  return true;
}

async function registerDeviceToken({ usuarioId, token, platform = "android" }) {
  if (!usuarioId) throw new Error("usuarioId requerido");
  if (!token || typeof token !== "string" || token.length < 20) {
    throw new Error("token invalido");
  }

  return deviceTokenRepo.upsertToken({ usuarioId, token, platform });
}

async function sendToUser({ usuarioId, title, body, data = {} }) {
  if (!ensureFirebaseInitialized()) {
    throw new Error("FCM no configurado en backend (FIREBASE_SERVICE_ACCOUNT_JSON)");
  }

  const devices = await deviceTokenRepo.getActiveTokensByUsuarioId(usuarioId);
  const tokens = devices.map((d) => d.token).filter(Boolean);
  if (tokens.length === 0) {
    return { sent: 0, failed: 0, message: "No hay tokens activos" };
  }

  const response = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data
  });

  const invalidTokens = [];
  response.responses.forEach((item, index) => {
    if (item.success) return;
    const code = item.error && item.error.code;
    if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") {
      invalidTokens.push(tokens[index]);
    }
  });

  if (invalidTokens.length > 0) {
    await deviceTokenRepo.deactivateByTokens(invalidTokens);
  }

  return {
    sent: response.successCount,
    failed: response.failureCount,
    invalidated: invalidTokens.length
  };
}

module.exports = {
  registerDeviceToken,
  sendToUser
};

