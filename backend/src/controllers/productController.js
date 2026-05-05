/**
 * @fileoverview Controlador para la gestión de Productos.
 * Nota: Es posible que este controlador provenga de un proyecto anterior 
 * (ej. Black Market) dado que el modelo Product no forma parte de la liga.
 */

const Product = require('../models/Product');

/**
 * Obtiene todos los productos de la base de datos, ordenados por fecha de creación (descendente).
 * 
 * @async
 * @function getProducts
 * @param {Object} req - Petición Express.
 * @param {Object} res - Respuesta Express.
 */
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error al obtener productos.' });
  }
};

/**
 * Agrega un nuevo producto a la base de datos.
 * 
 * @async
 * @function addProduct
 * @param {Object} req - Petición Express (cuerpo con datos del producto).
 * @param {Object} res - Respuesta Express.
 */
exports.addProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen, user_email } = req.body;

    const product = await Product.create({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen,
      user_email
    });

    res.status(201).json({ success: true, msg: 'Producto agregado.', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error al agregar producto.' });
  }
};

/**
 * Elimina un producto de la base de datos.
 * Verifica que el usuario que lo intenta eliminar sea el propietario.
 * 
 * @async
 * @function deleteProduct
 * @param {Object} req - Petición Express (parámetro de ruta 'id' y cuerpo 'user_email').
 * @param {Object} res - Respuesta Express.
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_email } = req.body; // or from JWT req.user

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ success: false, msg: 'No encontrado.' });

    // Validación de permisos de propiedad (el usuario debe ser quien lo creó)
    if (product.user_email !== user_email) {
      return res.status(403).json({ success: false, msg: 'Sin permiso.' });
    }

    await product.destroy();
    res.status(200).json({ success: true, msg: 'Borrado con éxito.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Error al borrar.' });
  }
};
