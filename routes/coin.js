const fetch = import("node-fetch").then(module => module.default);

const express = require("express");
const router = express.Router();

// Middleware para consultar el precio de la moneda en CoinCap
async function fetchCoinPrice(coinName) {
  try {
    const fetchModule = await import("node-fetch");
    const response = await fetchModule.default(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = await response.json();
    if (data.data) {
      return data.data.priceUsd;
    } else {
      return null;
    }
  } catch (error) {
    res.status(404).send("Error cargando los datos");
    return null;
  }
}

router.get("/:coinName", async (req, res) => {
  const coinName = req.params.coinName;
  const price = await fetchCoinPrice(coinName);

  if (price !== null) {
    res.send(`El precio en USD de ${coinName} para el día de hoy es ${price}`);
  } else {
    res.status(400).send("Error de entrada: Nombre de la moneda no se encuentra o es incorrecto");
  }
});

module.exports = router;