const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  status: {
      type: Boolean,
      default: true,
      require: true
  },
  usuario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true
  }
});

module.exports = model("Category", categorySchema);
