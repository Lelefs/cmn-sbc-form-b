const BemVindo = require('../models/BemVindo');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const inscricoes = await BemVindo.find();

    return res.json(inscricoes);
  },

  async store(req, res) {
    const { nome, telefone, email, batismoNovoMembro, participaCelula, nomeLider } = req.body;

    const emailExiste = await BemVindo.findOne({ email });

    if (emailExiste) {
      return res
        .status(400)
        .json('Você já fez a inscrição.');
    }

    const novoNome = formataNome(nome);
    let novoNomeLider = '';

    if (participaCelula) {
      novoNomeLider = formataNome(nomeLider)
    } else {
      novoNomeLider = null
    }

    const novaInscricao = await BemVindo.create({
      nome: novoNome,
      telefone,
      email,
      batismoNovoMembro,
      participaCelula,
      nomeLider: novoNomeLider });

    return res.json(novaInscricao);
  },

  /* async update(req, res) {
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
  }, */

  async contagem(req, res) {
    const total = await BemVindo.find().countDocuments();

    return res.json({ total });
  },
};
