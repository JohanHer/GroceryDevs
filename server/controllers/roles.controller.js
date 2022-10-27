const db = require("../models/");
var router = require("express").Router();
const Role = db.roles;
Tent = require("../models/roles.models");

// Create and Save a new ventas
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a venta
  const roles = new Role({
    name: req.body.name
    
     
         
    });

  // Save venta in the database
  roles
    .save(roles)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the usuario."
      });
    });
};

// Create a new venta-producto
// NEW_COMMENT = {
//   _id: req.body._id,
//   cantidad: 10,
//   updated: ISODate()
// }

// db.posts.updateOne( 
//   { _id : ObjectId("6358a37970def17bbc2f33ed") },
//   { $push: { detalleCompra: NEW_COMMENT } }
// )

// Retrieve all ventas from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Role.find(condition)
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

  Role.findById(id)
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

  Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

  Role.findByIdAndRemove(id, { useFindAndModify: false })
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
  Role.deleteMany({})
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
// exports.updateD = (req, res) => {
//     if (req.body._id) {
//       Venta.updateMany({ _id: req.body._id }, {
//               $push: {
//                   'detalleCompra': {
//                       idProducto: req.body.idProducto,
//                       cantidad: req.body.cantidad
//                   }
//               }
//           },
//          (error) => {
//               if (error) {
//                   return res.json({
//                       success: false,
//                       msj: 'No se pudo agregar el detalleCompra',
//                       err
//                   });
//               } else {
//                   return res.json({
//                       success: true,
//                       msj: 'Se agregó correctamente el detalleCompra'
//                   });
//               }
//           }
//       )
//   } else {
//       return res.json({
//           success: false,
//           msj: 'No se pudo agregar el detalle compra, por favor verifique que el _id sea correcto'
//       });
//   }
// };