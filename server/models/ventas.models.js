
var Schema = mongoose.Schema;
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: String,
        nu_item: String,
        fecha: String,
        idCliente: String,
        idVenta: String,
        valor: Number,
        confirmado: Boolean,
        detalleCompra: [
          {idProducto: { type: Schema.ObjectId, ref: "producto"}, 
            cantidad:Number}]
             },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Venta = mongoose.model("venta", schema);
    return Venta;
  };
