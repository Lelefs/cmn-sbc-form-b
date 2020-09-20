const { Schema, model } = require('mongoose');

const ComunaKidsSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    idade: {
      type: Number,
      required: true,
    },
    responsavel: {
      type: String,
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

module.exports = model('ComunaKids', ComunaKidsSchema);
