const Mulheres = require('../models/Mulheres');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { removerAcentos } = require('../utils/RemoverAcentos');
require('dotenv/config');

module.exports = {
  async index(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2021, 1, diaCulto, 0, 0, 0);

    const presencas = await Mulheres.find({ dataCulto, checkin: horario });

    return res.json(presencas);
  },

  async store(req, res) {
    const { nome, celula, telefone } = req.body;
   
    const novaInscricao = await Mulheres.create({
      nome,
      celula,
      telefone
    });

    return res.json(novaInscricao);
  },

  async show(req, res) {
    const mulheres = await Mulheres.find();

    return res.json(mulheres);
  },

  async update(req, res) {
    const { _id, compareceuSimNao } = req.body;

    const culto = await Mulheres.findById({ _id });

    if (!culto) {
      return res
        .status(400)
        .json(
          'Não foi possível alterar o checkin. Tente novamente mais tarde.',
        );
    }

    await Culto.updateOne({ _id }, { compareceu: compareceuSimNao });

    return res.json('Checkin realizado com sucesso!');
  },

  async contagem(req, res) {
    const { diaCulto, horario } = req.params;

    const dataCulto = new Date(2021, 1, diaCulto, 0, 0, 0);

    const total = await Mulheres.find({
      dataCulto,
      checkin: horario,
    }).countDocuments();

    const totalPresentes = await Mulheres.find({
      dataCulto,
      checkin: horario,
      compareceu: true,
    }).countDocuments();

    return res.json({ total, totalPresentes });
  },
};
