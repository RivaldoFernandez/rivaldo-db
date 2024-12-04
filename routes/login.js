const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/usermodel');

// POST: Inicio de sesión de usuario
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  // Validar si ambos campos están presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Comparar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    // Enviar la respuesta con el usuario y el token
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        country: user.country,
        state: user.state,
        city: user.city,
      },
      token,  // El token de acceso
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
});


module.exports = router;
