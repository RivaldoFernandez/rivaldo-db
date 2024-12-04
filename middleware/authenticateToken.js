// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token desde los encabezados

//   if (!token) {
//     return res.status(403).json({ error: 'Token requerido' });
//   }

//   // Verificar el token
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ error: 'Token no válido' });
//     }
//     req.user = user; // Almacenar la información del usuario en la solicitud
//     next(); // Continuar con la siguiente acción (ruta)
//   });
// }

// module.exports = authenticateToken;
const jwt = require('jsonwebtoken');
const User = require('../Model/usermodel');  // Asegúrate de tener el modelo de usuario importado

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener el token desde los encabezados

  if (!token) {
    return res.status(403).json({ error: 'Token requerido' });
  }

  // Verificar el token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token no válido' });
    }

    // Usar el ID del usuario decodificado para buscar el usuario completo en la base de datos
    try {
      const user = await User.findById(decoded.userId);  // Suponiendo que guardaste el ID del usuario en el token
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      // Guardamos el usuario completo en `req.user` para que esté disponible en la siguiente middleware o ruta
      req.user = user;
      next();  // Continuar con la siguiente acción (ruta)
    } catch (err) {
      return res.status(500).json({ error: 'Error al obtener usuario', details: err.message });
    }
  });
}

module.exports = authenticateToken;
