module.exports = app => {
  const role = require("../controllers/roles.controller.js");

  var router = require("express").Router();

  // Create a new ventas
  router.post("/", role.create);
    // Retrieve all ventas
  router.get("/", role.findAll);
  
  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single ventas with id
  router.get("/:id", role.findOne);

  // Update a ventas with id
  router.put("/:id", role.update);

  // Delete a ventas with id
  router.delete("/:id", role.delete);

  // Delete a all ventas
  router.delete("/", role.deleteAll);

  app.use("/api/role", router);
  
};