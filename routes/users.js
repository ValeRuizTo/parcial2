const express = require("express");

const router = express.Router();

// /users/
router
  .route("/")
  .get((req, res) => {
    // query param
    // req.query.[queryParamName]
//Para que sirve
    res.send(
      `users`
    );
  })
  .post((req, res) => {
    res.send(`User id: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`User id: ${req.params.id}`);
  });


module.exports = router;
