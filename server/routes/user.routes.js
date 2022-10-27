module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new ventas
  router.post("/", user.create);
    // Retrieve all ventas
  router.get("/", user.findAll);
  
  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // Retrieve a single ventas with id
  router.get("/:id", user.findOne);

  // Update a ventas with id
  router.put("/:id", user.update);

  // Delete a ventas with id
  router.delete("/:id", user.delete);

  // Delete a all ventas
  router.delete("/", user.deleteAll);

  app.use("/api/user", router);
  
};