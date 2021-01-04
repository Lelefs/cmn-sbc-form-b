const Culto = require('../models/Culto');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { removerAcentos } = require('../utils/RemoverAcentos');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2021, 0, diaCulto, 0, 0, 0);

    const presencas = await Culto.find({ dataCulto, checkin: horario });

    return res.json(presencas);
  },

  async store(req, res) {
    const { nome, telefone, horario } = req.body;
    const email = removerAcentos(req.body.email.toLowerCase());
    const proximoDia = process.env.DIA;
    const novoNome = removerAcentos(formataNome(nome));

    const dataCulto = new Date(2021, 0, proximoDia, 0, 0, 0);

    const usuarioExiste = await Culto.findOne({
      dataCulto,
      $or: [{ email }, { nome: novoNome }],
      checkin: horario,
    });

    if (usuarioExiste) {
      return res
        .status(400)
        .json('Você já fez a inscrição para esse dia/horário');
    }

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
    const { _id, compareceuSimNao } = req.body;

    const culto = await Culto.findById({ _id });

    if (!culto) {
      return res
        .status(400)
        .json(
          'Não foi possível alterar o checkin. Tente novamente mais tarde.',
        );
    }

    await Culto.updateOne({ _id }, { compareceu: compareceuSimNao });

    return res.json('Checkin alterado com sucesso!');
  },

  async contagem(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2021, 0, diaCulto, 0, 0, 0);

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
