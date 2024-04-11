const express = require("express");
const router = express.Router();
const nombres = require('./nombres');

router.get("/:count", (req, res) => {
  const count = parseInt(req.params.count); 
  let sort = req.query.sort || 'ASC'; 
  sort = sort.toUpperCase(); // Convertir sort a mayúsculas
  
  let sortedNombres = nombres.slice(); 
  if (sort === 'ASC') {
    sortedNombres.sort().reverse();
  } else if (sort === 'DESC') {
    sortedNombres.sort();
  } else {
    return res.status(400).send('El parámetro sort debe ser ASC o DESC'); 
  }

  res.send(sortedNombres.slice(0, count));
});

module.exports = router;
