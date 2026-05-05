/**
 * @fileoverview Middleware de autenticación mediante JSON Web Tokens (JWT).
 */
const jwt = require('jsonwebtoken');

/**
 * Middleware que verifica si la petición incluye un token JWT válido
 * en la cabecera 'Authorization' con el formato 'Bearer <token>'.
 * Si el token es válido, decodifica el payload y lo guarda en req.user 
 * para su uso en los siguientes middlewares/controladores.
 * 
 * @function verifyToken
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 */
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, data: null, message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, data: null, message: 'Token inválido o expirado' });
  }
};

module.exports = verifyToken;
