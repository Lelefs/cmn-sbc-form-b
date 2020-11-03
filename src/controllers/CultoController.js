const Culto = require('../models/Culto');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { sendMessage } = require('../websocket');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2020, 10, diaCulto, 0, 0, 0);

    const presencas = await Culto.find({ dataCulto, checkin: horario });

    return res.json(presencas);
  },

  async store(req, res) {
    const { nome, telefone, horario } = req.body;
    const email = req.body.email.toLowerCase();
    const proximoDia = process.env.DIA;

    const dataCulto = new Date(2020, 10, proximoDia, 0, 0, 0);

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

    sendMessage('novo-checkin', _id);

    return res.json('Checkin alterado com sucesso!');
  },

  async contagem(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2020, 10, diaCulto, 0, 0, 0);

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
