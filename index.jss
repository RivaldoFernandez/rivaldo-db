// const dotenv = require('dotenv');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors'); // Agregar CORS si es necesario
// const loginRoutes = require('./routes/login');
// const registerRoutes = require('./routes/register');
// const usersRoutes = require('./routes/users');

// dotenv.config(); // Cargar las variables de entorno

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors()); // Habilitar CORS

// // Conexión a MongoDB
// const mongoUri = process.env.MONGODB_CONNECT_URI;
// if (!mongoUri) {
//   throw new Error('MONGODB_CONNECT_URI no está definido en las variables de entorno.');
// }

// mongoose
//   .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch((err) => console.error('Error al conectar a MongoDB:', err));

// // Rutas
// app.use('/api/users', usersRoutes);
// app.use('/api/login', loginRoutes);
// app.use('/api/register', registerRoutes);

// // Middleware para manejo de errores
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Algo salió mal!', details: err.message });
// });

// // Puerto
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });