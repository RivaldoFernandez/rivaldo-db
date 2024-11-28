const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelo de ejemplo
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', UserSchema);

// GET: Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// POST: Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
});

// PUT: Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el usuario' });
  }
});

// DELETE: Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
