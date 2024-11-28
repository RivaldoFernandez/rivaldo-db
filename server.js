require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECT_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Importa las rutas
const usersRoutes = require('./api/users');
app.use('/api/users', usersRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
