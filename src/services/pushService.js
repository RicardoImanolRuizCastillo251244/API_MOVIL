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

  const messaging = admin.messaging();

  const invalidTokens = [];

  // Ensure data values are strings (FCM requires string->string map for data)
  const dataMap = {};
  if (data && typeof data === 'object') {
    Object.entries(data).forEach(([k, v]) => {
      dataMap[k] = typeof v === 'string' ? v : JSON.stringify(v);
    });
  }

  // Prefer sendMulticast / sendAll, otherwise fallback to per-token send().
  if (typeof messaging.sendMulticast === "function") {
    const response = await messaging.sendMulticast({ tokens, notification: { title, body }, data: dataMap });
    const responses = response.responses || [];
    const errors = [];
    responses.forEach((item, index) => {
      if (item.success) return;
      const errMsg = (item.error && (item.error.code || item.error.message)) || 'unknown error';
      errors.push({ token: tokens[index], error: errMsg });
      const code = item.error && item.error.code;
      if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") {
        invalidTokens.push(tokens[index]);
      }
    });
    if (invalidTokens.length > 0) await deviceTokenRepo.deactivateByTokens(invalidTokens);
    if (process.env.DEBUG_PUSH === 'true') console.error('FCM multicast errors:', errors);
    const result = { sent: response.successCount, failed: response.failureCount, invalidated: invalidTokens.length };
    if (process.env.DEBUG_PUSH === 'true') result.errors = errors;
    return result;
  }

  if (typeof messaging.sendAll === "function") {
    const messages = tokens.map((t) => ({ token: t, notification: { title, body }, data }));
    const response = await messaging.sendAll(messages);
    const responses = response.responses || [];
    const errors = [];
    responses.forEach((item, index) => {
      if (item.success) return;
      const errMsg = (item.error && (item.error.code || item.error.message)) || 'unknown error';
      errors.push({ token: tokens[index], error: errMsg });
      const code = item.error && item.error.code;
      if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") {
        invalidTokens.push(tokens[index]);
      }
    });
    if (invalidTokens.length > 0) await deviceTokenRepo.deactivateByTokens(invalidTokens);
    if (process.env.DEBUG_PUSH === 'true') console.error('FCM sendAll errors:', errors);
    const result = { sent: response.successCount, failed: response.failureCount, invalidated: invalidTokens.length };
    if (process.env.DEBUG_PUSH === 'true') result.errors = errors;
    return result;
  }

  // Final fallback: send one-by-one using messaging.send()
  let successCount = 0;
  let failureCount = 0;
  const results = await Promise.all(tokens.map((t) =>
    messaging.send({ token: t, notification: { title, body }, data: dataMap }).then(() => ({ success: true })).catch((err) => ({ success: false, error: err && (err.code || err.message) || 'unknown error' }))
  ));

  const errors = [];
  results.forEach((r, i) => {
    if (r.success) successCount++;
    else {
      failureCount++;
      const code = r.error;
      errors.push({ token: tokens[i], error: code });
      if (code === "messaging/registration-token-not-registered" || code === "messaging/invalid-registration-token") {
        invalidTokens.push(tokens[i]);
      }
    }
  });

  if (invalidTokens.length > 0) await deviceTokenRepo.deactivateByTokens(invalidTokens);
  if (process.env.DEBUG_PUSH === 'true') console.error('FCM per-token errors:', errors);
  const final = { sent: successCount, failed: failureCount, invalidated: invalidTokens.length };
  if (process.env.DEBUG_PUSH === 'true') final.errors = errors;
  return final;
}

module.exports = {
  registerDeviceToken,
  sendToUser
};

