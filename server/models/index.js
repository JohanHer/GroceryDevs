const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.productos = require("./productos.models.js")(mongoose);
db.ventas = require("./ventas.models.js")(mongoose);
module.exports = db;
db.usuarios = require("./usuario.models.js")(mongoose);
module.exports = db;
db.roles = require("./roles.models.js")(mongoose);
module.exports = db;