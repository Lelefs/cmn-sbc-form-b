const { Schema, model } = require('mongoose');

const CultoSchema = new Schema(
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
    dataCulto: {
      type: Date,
      required: true,
    },
    checkin: {
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

module.exports = model('Culto', CultoSchema);
