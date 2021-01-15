const { isAfter } = require('date-fns');
const ComunaKids = require('../models/ComunaKids');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const inscricoes = await ComunaKids.find();

    return res.json(inscricoes);
  },

  async store(req, res) {
    const { nome, idade, responsavel } = req.body;
    const hoje = new Date();
    const dataFinal = new Date(2020, 9, 15);

    if (isAfter(hoje, dataFinal)) {
      return res
        .status(400)
        .json('Não foi possível completar sua inscrição. Já expirou o prazo.');
    }

    const novoNome = formataNome(nome);
    const novoResponsavel = formataNome(responsavel);

    const novaInscricao = await ComunaKids.create({
      nome: novoNome,
      idade,
      responsavel: novoResponsavel,
    });

    return res.json(novaInscricao);
  },

  async update(req, res) {
    const { _id } = req.body;

    const inscricao = await ComunaKids.findById({ _id });

    if (!inscricao) {
      return res
        .status(400)
        .json(
          'Não foi possível alterar o checkin. Tente novamente mais tarde.',
        );
    }

    await ComunaKids.updateOne({ _id }, { compareceu: !inscricao.compareceu });

    return res.json('Checkin alterado com sucesso!');
  },

  async contagem(req, res) {
    const total = await ComunaKids.find().countDocuments();

    const totalPresentes = await ComunaKids.find({
      compareceu: true,
    }).countDocuments();

    return res.json({ total, totalPresentes });
  },
};
