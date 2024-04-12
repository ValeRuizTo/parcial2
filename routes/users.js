const express = require("express");
const router = express.Router();
const nombres = require('./nombres');


router.post("/", (req, res) => {
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { nombre, apellido, correo, ciudad, pais } = lowercaseBody;

  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Los parámetros nombre, apellido y correo electrónico son obligatorios.' });
  }

  const ciudadFinal = ciudad || "Bogotá";
  const paisFinal = pais || "Colombia";

  const usuario = {
    nombre,
    apellido,
    correo,
    ciudad: ciudadFinal,
    pais: paisFinal
  };

  res.status(201).json(usuario);
});

router.get("/:count", (req, res) => {
  const count = parseInt(req.params.count);

  if (isNaN(count) || count <= 0) {
    return res.status(400).send('El parámetro count debe ser un número positivo mayor que cero');
  }

  let sort = req.query.sort || 'ASC';
  sort = sort.toUpperCase();

  if (sort !== 'ASC' && sort !== 'DESC') {
    return res.status(400).send('El parámetro sort debe ser ASC o DESC');
  }

  let sortedNombres = nombres.slice();

  if (sort === 'ASC') {
    sortedNombres.sort();
  } else {
    sortedNombres.sort().reverse();
  }

  const nombresTexto = sortedNombres.slice(0, count).join('\n');
  res.type('text').send(nombresTexto);
});



module.exports = router;
