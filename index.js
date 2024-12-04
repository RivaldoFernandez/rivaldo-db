// const dotenv = require('dotenv');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const loginRoutes = require('./routes/login');
// const registerRoutes = require('./routes/register');
// const usersRoutes = require('./routes/users');
// const authenticateToken = require('./middleware/authenticateToken'); // Middleware para autenticación
// const app = express();

// dotenv.config();

// // Middleware
// app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON
// app.use(cors()); // Habilitar CORS para permitir solicitudes desde otros dominios

// // Conexión a MongoDB
// const mongoUri = process.env.MONGODB_CONNECT_URI;
// if (!mongoUri) {
//   throw new Error('MONGODB_CONNECT_URI no está definido en las variables de entorno.');
// }

// mongoose
//   .connect(mongoUri)
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch((err) => console.error('Error al conectar a MongoDB:', err));

// // Rutas
// app.use('/api/login', loginRoutes); // Ruta para login
// app.use('/api/register', registerRoutes); // Ruta para registro
// app.use('/api/users', authenticateToken, usersRoutes);  // Ruta para usuarios protegida por autenticación

// // Middleware para manejo de errores
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Algo salió mal!', details: err.message });
// });

// // Puerto
// const PORT = process.env.PORT || 8080; // Valor por defecto si no se especifica el puerto
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });



const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const usersRoutes = require('./routes/users');
const authenticateToken = require('./middleware/authenticateToken'); 
const usersRegisterRoutes = require('./routes/usersRegister');

dotenv.config();



const app = express();

// Middleware
app.use(express.json()); // Para parsear el cuerpo de las solicitudes en formato JSON
app.use(cors()); // Habilitar CORS para permitir solicitudes desde otros dominios

// Conexión a MongoDB
const mongoUri = process.env.MONGODB_CONNECT_URI;
if (!mongoUri) {
  throw new Error('MONGODB_CONNECT_URI no está definido en las variables de entorno.');
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.use('/api/login', loginRoutes); // Ruta para login
app.use('/api/register', registerRoutes); // Ruta para registro
app.use('/api/users', authenticateToken, usersRoutes);  // Ruta para usuarios protegida por autenticación
app.use('/api/usersRegister', usersRegisterRoutes);
app.use('/api/user', authenticateToken, (req, res) => {
  // Devolver los datos completos del usuario
  res.json({
    name: req.user.username,
    email: req.user.email,
    country: req.user.country,
    state: req.user.state,
    city: req.user.city,
  });
});


// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!', details: err.message });
});

// Puerto
const PORT = process.env.PORT || 8080; // Valor por defecto si no se especifica el puerto
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
