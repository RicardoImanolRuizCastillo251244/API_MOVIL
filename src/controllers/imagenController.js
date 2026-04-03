const imagenService = require('../services/imagenService');
const supabase = require('../lib/supabase');

async function create(req, res) {
  try {
    const usuarioId = req.user.id;
    const { materiaId, nota } = req.body;

    // file comes from multer memoryStorage
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'file required' });
    if (!/^image\//.test(file.mimetype)) return res.status(400).json({ error: 'invalid file type' });

    const ext = (file.originalname || 'file').split('.').pop();
    const filename = `apuntes/${usuarioId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // upload to Supabase Storage (bucket 'apuntes')
    const { error: uploadError } = await supabase.storage.from('apuntes').upload(filename, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('apuntes').getPublicUrl(filename);
    const publicURL = urlData && urlData.publicUrl ? urlData.publicUrl : null;

    const payload = {
      materiaId: Number(materiaId),
      usuarioId,
      uri: publicURL || filename,
      nota: nota || null,
      fecha: Date.now(),
      favorita: false
    };

    const imagen = await imagenService.createImagen(payload);
    res.status(201).json(imagen);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function list(req, res) {
  try {
    const usuarioId = req.user.id;
    const materiaId = req.query.materiaId || null;
    const items = await imagenService.listImagenes(usuarioId, materiaId);
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function remove(req, res) {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    const ok = await imagenService.deleteImagen(id, usuarioId);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { create, list, remove };
