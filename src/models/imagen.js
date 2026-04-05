const { DataTypes } = require('sequelize');
const supabase = require('../lib/supabase');

module.exports = (sequelize) => {
  return sequelize.define('Imagen', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    materiaId: { type: DataTypes.INTEGER, allowNull: false },
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    uri: { type: DataTypes.STRING, allowNull: false },
    nota: { type: DataTypes.TEXT, allowNull: true },
    fecha: { type: DataTypes.BIGINT, allowNull: false },
    favorita: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    horarioId: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    tableName: 'imagenes',
    timestamps: false,
    hooks: {
      // when an Imagen row is destroyed, remove the file from Supabase storage if possible
      afterDestroy: async (img, options) => {
        try {
          if (!img || !img.uri) return;

          let pathToRemove = null;
          const uri = img.uri.toString();

          if (uri.startsWith('http')) {
            // Try to extract path after '/object/public/' (Supabase public URL pattern)
            const m = uri.match(/\/object\/public\/(.*)$/);
            if (m && m[1]) {
              pathToRemove = decodeURIComponent(m[1]);
            } else {
              // Fallback: find '/apuntes/' segment
              const idx = uri.indexOf('/apuntes/');
              if (idx !== -1) pathToRemove = uri.substring(idx + 1); // remove leading '/'
            }
          } else {
            // assume stored path like 'apuntes/usuario/filename'
            pathToRemove = uri;
          }

          if (pathToRemove) {
            await supabase.storage.from('apuntes').remove([pathToRemove]);
          }
        } catch (e) {
          // don't throw during lifecycle hook; log for debugging
          // eslint-disable-next-line no-console
          console.error('Failed to remove image from storage in afterDestroy hook:', e.message || e);
        }
      }
    }
  });
};
