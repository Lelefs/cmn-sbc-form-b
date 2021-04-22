const { Schema, model } = require('mongoose');

const MagOneWaySchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    celula: {
      type: String,
      required: true,
      lowercase: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    compareceu: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('MagOneWay', MagOneWaySchema);
