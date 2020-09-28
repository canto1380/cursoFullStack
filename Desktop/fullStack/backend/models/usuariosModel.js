const mongoose = require('mongoose');

const usuariosSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
      maxlength: 32,
      unique: true
    },
    lastName: {
        type: String,
        trim: true,
        require: true,
        maxlength: 32,
        unique: true
      },
      dni: {
        type: Number,
        trim: true,
        require: true,
        maxlength: 32,
        unique: true
      },
      email: {
        type: String,
        trim: true,
        require: true,
        maxlength: 70,
        unique: true
      },
      photo: {
        data: Buffer,
        contentType: String
      }
  },
  {timestamps: true}
);

module.exports = mongoose.model("Usuario", usuariosSchema);