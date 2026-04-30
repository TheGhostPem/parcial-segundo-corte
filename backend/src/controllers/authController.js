const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { usuario, password, rol } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const nuevo = await Usuario.create({ usuario, password: hashed, rol });
    res.status(201).json({ success: true, data: nuevo, message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(400).json({ success: false, data: null, message: 'El usuario ya existe o datos inválidos' });
  }
};

exports.login = async (req, res) => {
  try {
    const { usuario, password } = req.body;
    const user = await Usuario.findOne({ where: { usuario } });

    if (!user) {
      return res.status(404).json({ success: false, data: null, message: 'Usuario no encontrado' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, data: null, message: 'Contraseña incorrecta' });
    }

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
