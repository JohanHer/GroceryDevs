
const mongoose = require('mongoose')


const productosSchema = mongoose.Schema({
    id: String,
    nombre: String,
    descripcion: String,
    caracteristicas: String,
    urlImagen: String,
    price: String
    
    })

const Productos = mongoose.model('productos', productosSchema)

module.exports = Productos