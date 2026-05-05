/**
 * @fileoverview Middleware de autorización basado en roles.
 */

/**
 * Genera un middleware para restringir el acceso a ciertos roles de usuario.
 * Verifica si el rol del usuario autenticado (extraído por verifyToken) 
 * está dentro del arreglo de roles permitidos.
 * 
 * @function checkRole
 * @param {string[]} roles - Arreglo con los roles permitidos (ej. ['admin', 'moderador']).
 * @returns {Function} Middleware de Express (req, res, next).
 */
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.rol)) {
      return res.status(403).json({ 
        success: false, 
        data: null, 
        message: 'No tienes permisos para realizar esta acción' 
      });
    }
    next();
  };
};

module.exports = checkRole;
