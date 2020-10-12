const { Schema, model } = require('mongoose');

const BemVindoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    telefone: {
      type: Number,
      required: true,
    },
    batismoNovoMembro: {
      type: String,
      required: true,
    },
    participaCelula: {
      type: Boolean,
      required: true,
    },
    nomeLider: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model('BemVindo', BemVindoSchema);
