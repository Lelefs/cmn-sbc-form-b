const Culto = require('../models/Culto');
const { format } = require('date-fns');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2020, 9, diaCulto, 0, 0, 0);

    const presencas = await Culto.find({ dataCulto, checkin: horario });

    return res.json(presencas);
  },

  async store(req, res) {
    const { nome, email, telefone, horario } = req.body;
    const proximoDia = process.env.DIA;

    const dataCulto = new Date(2020, 9, proximoDia, 0, 0, 0);

    const emailExiste = await Culto.findOne({
      dataCulto,
      email,
      checkin: horario,
    });

    if (emailExiste) {
      return res
        .status(400)
        .json('Você já fez a inscrição para esse dia/horário');
    }

    const novoNome = formataNome(nome);

    const novaInscricao = await Culto.create({
      nome: novoNome,
      email,
      telefone,
      dataCulto,
      checkin: horario,
    });

    return res.json(novaInscricao);
  },

  async update(req, res) {
    const { _id } = req.body;

    const culto = await Culto.findById({ _id });

    if (!culto) {
      return res
        .status(400)
        .json(
          'Não foi possível alterar o checkin. Tente novamente mais tarde.',
        );
    }

    await Culto.updateOne({ _id }, { compareceu: !culto.compareceu });

    return res.json('Checkin alterado com sucesso!');
  },

  async contagem(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2020, 9, diaCulto, 0, 0, 0);

    const total = await Culto.find({
      dataCulto,
      checkin: horario,
    }).countDocuments();

    const totalPresentes = await Culto.find({
      dataCulto,
      checkin: horario,
      compareceu: true,
    }).countDocuments();

    return res.json({ total, totalPresentes });
  },
};
