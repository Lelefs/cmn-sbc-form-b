const MagOneWay = require('../models/MagOneWay');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { removerAcentos } = require('../utils/RemoverAcentos');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2021, 1, diaCulto, 0, 0, 0);

    const presencas = await MagOneWay.find({ dataCulto, checkin: horario });

    return res.json(presencas);
  },

  async store(req, res) {
    const { nome, celula, telefone } = req.body;
    const novoNome = removerAcentos(formataNome(nome));
    const novaCelula = removerAcentos(formataNome(celula));

    const usuarioExiste = await MagOneWay.findOne({
      nome: novoNome,
      celula: novaCelula,
    });

    if (usuarioExiste) {
      return res
        .status(400)
        .json('Você já fez a inscrição para o culto das MagOneWay');
    }

    const novaInscricao = await MagOneWay.create({
      nome: novoNome,
      celula: novaCelula,
      telefone,
    });

    return res.json(novaInscricao);
  },

  async show(req, res) {
    const pessoas = await MagOneWay.find();

    return res.json(pessoas);
  },

  async update(req, res) {
    const { _id, compareceuSimNao } = req.body;

    const culto = await MagOneWay.findById({ _id });

    if (!culto) {
      return res
        .status(400)
        .json(
          'Não foi possível alterar o checkin. Tente novamente mais tarde.',
        );
    }

    await MagOneWay.updateOne({ _id }, { compareceu: compareceuSimNao });

    return res.json('Checkin realizado com sucesso!');
  },

  async contagem(req, res) {
    const total = await MagOneWay.find().countDocuments();

    const totalPresentes = await MagOneWay.find({
      compareceu: true,
    }).countDocuments();

    return res.json({ total, totalPresentes });
  },
};
