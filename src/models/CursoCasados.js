const { Schema, model } = require('mongoose');

const CursoCasadosSchema = new Schema(
  {
    nome1: {
      type: String,
      required: true,
    },
    email1: {
      type: String,
      required: true,
      lowercase: true,
    },
    telefone1: {
      type: Number,
      required: true,
    },
    participaCelula1: {
      type: Boolean,
      default: false,
    },
    celula1: {
      type: String,
    },
    batizado1: {
      type: Boolean,
      default: false,
    },
    nome2: {
      type: String,
      required: true,
    },
    email2: {
      type: String,
      required: true,
      lowercase: true,
    },
    telefone2: {
      type: Number,
      required: true,
    },
    participaCelula2: {
      type: Boolean,
      default: false,
    },
    celula2: {
      type: String,
    },
    batizado2: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('CursoCasados', CursoCasadosSchema);
