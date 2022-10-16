module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: String,
        nu_item: String,
        nombre: String,
        descripcion: String,
        caracteristicas: String,
        urlImagen: String,
        precio: String,
        stock: String
             },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Producto = mongoose.model("producto", schema);
    return Producto;
  };
