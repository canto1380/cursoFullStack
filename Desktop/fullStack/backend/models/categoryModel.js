  
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
      unique: true
    }
  },
  {timestamps: true}
);

/** toma el esquema y los guarda dentro de una coleccion de mongoDB **/
module.exports = mongoose.model("Category", categorySchema);