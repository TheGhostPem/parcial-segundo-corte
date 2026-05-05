/**
 * @fileoverview Controlador para la autenticación de usuarios.
 * Contiene la lógica para el registro e inicio de sesión,
 * incluyendo el hashing de contraseñas y la generación de tokens JWT.
 */

const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registra un nuevo usuario en la base de datos.
 * Hashea la contraseña antes de guardarla.
 * 
 * @async
 * @function register
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} req.body - Cuerpo de la petición.
 * @param {string} req.body.usuario - Nombre del nuevo usuario.
 * @param {string} req.body.password - Contraseña en texto plano.
 * @param {string} req.body.rol - Rol del usuario (admin, usuario, moderador).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.register = async (req, res) => {
  try {
    const { usuario, password, rol } = req.body;
    // Encriptar la contraseña usando bcrypt (costo 10)
    const hashed = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({ usuario, password: hashed, rol });
    res.status(201).json({ success: true, data: nuevo, message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'El usuario ya existe o datos inválidos' });
  }
};

/**
 * Inicia sesión para un usuario existente.
 * Verifica las credenciales y genera un JSON Web Token (JWT).
 * 
 * @async
 * @function login
 * @param {Object} req - Objeto de petición de Express.
 * @param {Object} req.body - Cuerpo de la petición.
 * @param {string} req.body.usuario - Nombre de usuario.
 * @param {string} req.body.password - Contraseña.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'Usuario no encontrado' });
    }

    // Comparar contraseña en texto plano con el hash de la BD
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, data: null, message: 'Contraseña incorrecta' });
    }

    // Generar Token JWT válido por 8 horas
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(200).json({ 
      success: true, 
      data: { token, user: { usuario: user.usuario, rol: user.rol } }, 
      message: 'Login exitoso' 
    });
  } catch (err) {
    res.status(500).json({ success: false, data: null, message: 'Error en el servidor' });
  }
};
