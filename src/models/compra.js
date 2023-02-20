const mongoose = require("mongoose");

const compra = mongoose.model('Compra', {
  fecha: {
    type: Date,
    default: new Date(),
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
  },
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Curso",
  },
});

module.exports = compra;
