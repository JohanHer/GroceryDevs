const { ventas } = require("../models/");
const db = require("../models/");
const Venta = db.ventas;

// Create and Save a new ventas
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fecha) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Producto
  const venta = new Venta({
    nu_item: req.body.nu_item,
    fecha: req.body.fecha,
    idCliente: req.body.idCliente,
    idVenta: req.body.idVenta,
    valor: req.body.valor,
    confirmado: req.body.confirmado,
    detalleCompra: req.body.detalleCompra
    
  });

  // Save venta in the database
  venta
    .save(venta)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the venta."
      });
    });
};

// Retrieve all ventas from the database.
exports.findAll = (req, res) => {
  const fecha = req.query.fecha;
  var condition = fecha ? { fecha: { $regex: new RegExp(fecha), $options: "i" } } : {};

  Venta.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving venta."
      });
    });
};

// Find a single venta with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Venta.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found venta with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving venta with id=" + id });
    });
};

// Update a venta by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Venta.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update venta with id=${id}. Maybe venta was not found!`
        });
      } else res.send({ message: "Venta was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating venta with id=" + id
      });
    });
};

// Delete a venta with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Venta.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete venta with id=${id}. Maybe venta was not found!`
        });
      } else {
        res.send({
          message: "Venta was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete venta with id=" + id
      });
    });
};

// Delete all ventas from the database.
exports.deleteAll = (req, res) => {
  Venta.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Ventas were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all ventas."
      });
    });
};

app.get("/ventas", function (req, res) {
  Venta.find({}, function (err, ventas) {
    Productos.populate(ventas, { path: "productos" }, function (err, ventas) {
      res.status(200).send(ventas);
    });
  });
});

//Find all num_item Productos
// exports.findAllNu_item = (req, res) => {
//   Producto.find({ nu_item })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials."
//       });
//     });
// };
