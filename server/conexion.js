// Conexion Mongodb
const mongoose = require('mongoose')
mongoose
    .connect('mongodb+srv://jhalvarez4083:O9Grw3LeqGLezHjI@cluster0.xfxkubx.mongodb.net/misiontic')
    .then(() => console.log('CONECTADO A BBDD'))