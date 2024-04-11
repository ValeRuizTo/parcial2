// Con esto:
import fetch from "node-fetch";

const express = require("express");
const router = express.Router();

// Middleware para consultar el precio de la moneda en CoinCap
async function fetchCoinPrice(coinName) {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coinName}`);
    const data = await response.json();
    if (data.data) {
      return data.data.priceUsd;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return null;
  }
}

// Ruta para obtener el precio de una moneda
router.get("/coin/:coinName", async (req, res) => {
  const coinName = req.params.coinName;
  const price = await fetchCoinPrice(coinName);

  if (price !== null) {
    res.send(`El precio en dólares de ${coinName} para el día de hoy es ${price}`);
  } else {
    res.send("El nombre de la moneda no fue encontrado en la base de datos");
  }
});

module.exports = router;
