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
      `coin`
    );
  })
  .post((req, res) => {
    res.send(`User id: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`User id: ${req.params.id}`);
  });

// /users/test
router.get("/test", (req, res) => {
  res.send("Users list test - from endpoint");
});

// /users/:id
router.get("/:id", (req, res) => {
  const userID = req.params.id;
  const test = req.test;

  res.send(`Listing user with ID ${userID}, ${test}`);
});

// /users/:id
// como le queito el hi
router.get("/:id/hi/:name", (req, res) => { //no es necesario poner : eso solo significs que es variable
  const userID = req.params.id;
  const userName = req.params.name;

  res.send(`Listing user with ID ${userID}, say hi ${userName}`);
});

//   MIDDLEWARE
router.param("id", (req, res, next, id) => {
  console.log(id);

  // Este código se añade al request
  req.userId = id;
  req.test = "asdadfsdf";

  //   Next -> corre la siguiente linea -> esto es un middleware
  // middleware -> algo que ocurre entre el momento en que una petición llega al servidor y el momento la respuesta se retorna
  next();
});

module.exports = router;
