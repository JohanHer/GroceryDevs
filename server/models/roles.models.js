module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
    },
    {
      versionKey: false,
       
           },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Roles = mongoose.model("role", schema);
  return Roles;
};
