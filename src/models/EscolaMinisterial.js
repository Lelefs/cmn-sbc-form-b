const { Schema, model } = require('mongoose');

const EscolaMinisterialSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    celula: {
      type: String,
      required: true,
    },
    tempoComunidade: {
      type: String,
      required: true,
    },
    liderAuxiliar: {
      type: Boolean,
      default: false,
    },
    pretendeSerLider: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('EscolaMinisterial', EscolaMinisterialSchema);
