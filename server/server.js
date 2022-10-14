const express = require('express')
const app = express()

// Conexion Mongodb
const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://jhalvarez4083:O9Grw3LeqGLezHjI@cluster0.xfxkubx.mongodb.net/misiontic')
    .then(() => console.log('CONECTADO A BBDD'))

// Model
const Productos = require('./models/productos.models')

// CORS
const cors = require('cors')
app.use(cors())

// Routing
app.get('/api/productos', (req, res) => {

  Productos
      .find()
      .then(allProductos => res.json(allProductos))
      
})
app.get('/api/productos/:productos_id', (req, res) => {

  const { productos_id } = req.params

  Productos
      .findById(productos_id)
      .then(productos => res.json(productos))
    })

app.listen(5005, () => console.log('SERVIDOR LEVANTADO'))