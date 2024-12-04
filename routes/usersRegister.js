const express = require('express');
const router = express.Router();
const User = require('../Model/usermodel'); // Asegúrate de importar el modelo correcto

// Ruta pública para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    // Encuentra todos los usuarios y devuelve toda la información
    const users = await User.find(); // Esto devolverá todos los campos del modelo
    res.status(200).json(users); // Envía los usuarios como JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
});

module.exports = router;
