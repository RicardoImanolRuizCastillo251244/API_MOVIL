const cron = require('node-cron');
const horarioRepo = require('../repositories/horarioRepository');
const pushService = require('../services/pushService');
const { models } = require('../models');

async function processReminders() {
  try {
    const minutesAhead = 10;
    const now = new Date();
    const target = new Date(Date.now() + minutesAhead * 60000);
    // scheduledAt will be the target datetime (used to dedupe)
    const scheduledAt = new Date(target.getTime());

    const horarios = await horarioRepo.findStartingInMinutes(minutesAhead);
    for (const h of horarios) {
      // check if already notified
      const existing = await models.HorarioNotification.findOne({ where: { horarioId: h.id, scheduledAt } });
      if (existing) continue;

      const materiaNombre = h.Materia && h.Materia.nombre ? h.Materia.nombre : 'Clase';
      await pushService.sendToUser({
        usuarioId: h.usuarioId,
        title: 'Clase en 10 minutos',
        body: `${materiaNombre} — ${h.horaInicio}`,
        data: { screen: 'horarios', horarioId: String(h.id) }
      });

      await horarioRepo.markNotified(h.id, scheduledAt);
    }
  } catch (err) {
    console.error('Reminder job error:', err);
  }
}

// run every minute
cron.schedule('* * * * *', () => {
  processReminders();
});

module.exports = { processReminders };
