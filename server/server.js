const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use((req, res, next) => {
  console.log(`${req.url} - ${req.method}`);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const db = require("./models/");
db.mongoose
  .connect(db.url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GroceryDevs application." });
});

require("./routes/productos.routes")(app);
require("./routes/ventas.routes")(app);
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);


// app.get("/vent", function (req, res) {
//   Venta.findAll({}, function (err, ventas) {
//     Producto.populate(ventas, { path: "producto" }, function (err, ventas) {
//       res.status(200).send(ventas);
//       console.log(ventas)
//     });
//   });
// });
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});