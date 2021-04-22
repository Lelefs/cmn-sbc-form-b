const { Schema, model } = require('mongoose');

const MagSchema = new Schema(
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

module.exports = model('Mag', MagSchema);
