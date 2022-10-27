module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      id: { type: String},
      
      nombres: { type: String},

      apellidos: { type: String},

      nombres: {
        type: String},

      id: { type: String},
      username: {
        type: String,
        unique: true,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      roles: [
        {
          type: mongoose.Schema.Types.ObjectId, autopopulate: true,
          ref: "role",
        },
      ],
           },
    { timestamps: true }
  );
  schema.plugin(require('mongoose-autopopulate'));
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
 
  const Usuario = mongoose.model("usuario", schema);
  return Usuario;
};
