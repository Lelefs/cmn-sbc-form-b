const { Schema, model } = require('mongoose');

const StaffSchema = new Schema(
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
    idade: {
      type: Number,
      required: true,
    },
    batizado: {
      type: Boolean,
      default: false,
    },
    aptidoes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Staff', StaffSchema);
