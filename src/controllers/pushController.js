const pushService = require("../services/pushService");

async function registerToken(req, res) {
  try {
    const usuarioId = req.user.id;
    const { token, platform } = req.body;

    await pushService.registerDeviceToken({ usuarioId, token, platform });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function sendTest(req, res) {
  try {
    const usuarioId = req.user.id;
    const { title, body, data } = req.body;

    const result = await pushService.sendToUser({
      usuarioId,
      title: title || "Organizador Academico",
      body: body || "Notificacion de prueba",
      data: data && typeof data === "object" ? data : {}
    });

    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

module.exports = {
  registerToken,
  sendTest
};

