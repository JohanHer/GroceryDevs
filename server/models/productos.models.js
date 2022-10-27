module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: {type: String, require:true},
        nu_item: {type: String, require:true},
        nombre: {type: String, require:true},
        descripcion: {type: String, require:true},
        caracteristicas: {type: String, require:true},
        urlImagen: {type: String, require:true},
        precio: {type: String, require:true},
        stock: {type: String, require:true}
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
