module.exports = app => {
  const productos = require("../controllers/productos.controller.js");

  var router = require("express").Router();

  // Create a new Producto
  router.post("/", productos.create);

  // Retrieve all Productos
  router.get("/", productos.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Productos with id
  router.get("/:id", productos.findOne);

  // Update a Producto with id
  router.put("/:id", productos.update);

  // Delete a Producto with id
  router.delete("/:id", productos.delete);

  // Delete a all productos
  router.delete("/", productos.deleteAll);

  app.use("/api/productos", router);
};
