module.exports = app => {
  const ventas = require("../controllers/ventas.controller.js");

  var router = require("express").Router();

  // Create a new ventas
  router.post("/", ventas.create);

  // Retrieve all ventas
  router.get("/", ventas.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single ventas with id
  router.get("/:id", ventas.findOne);

  // Update a ventas with id
  router.put("/:id", ventas.update);

  // Delete a ventas with id
  router.delete("/:id", ventas.delete);

  // Delete a all ventas
  router.delete("/", ventas.deleteAll);

  app.use("/api/ventas", router);
};