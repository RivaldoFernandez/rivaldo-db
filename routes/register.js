const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Model/usermodel'); // Asegúrate de que la ruta y el nombre sean correctos

// POST: Registro de nuevo usuario
router.post('/', async (req, res) => {
  const { username, email, password, country, state, city } = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!username || !email || !password || !country || !state || !city) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      country,
      state,
      city,
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Generar un token JWT
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '1h' }
    );

    // Responder con los detalles del usuario y el token
    res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        country: newUser.country,
        state: newUser.state,
        city: newUser.city,
      },
      token,
    });
  } catch (error) {
    console.error(error); // Registrar el error en el servidor para depuración
    res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
  }
});

module.exports = router;
