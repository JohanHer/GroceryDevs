const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: {type: String, require:true},
        nu_item: {type: String, require:true},
        fecha: {type: String, require:true},
        idCliente: {
          type: mongoose.Schema.Types.ObjectId, autopopulate: true,
          ref: "usuario",
        },
        idVenta: {type: String, require:true},
        valor: {type: Number, require:true},
        confirmado: {type: Boolean, require:true},
        detalleCompra:  
          { type : Array , default : [] }
      }
      
      
      
             ,
      { timestamps: true }
    );
    schema.plugin(require('mongoose-autopopulate'));

    schema.plugin(require('mongoose-autopopulate'));

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
     
    
    const Venta = mongoose.model("venta", schema);
    return Venta;
  };
