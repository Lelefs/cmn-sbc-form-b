const CursoCasados = require('../models/CursoCasados');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');

module.exports = {
  async index(req, res) {
    const { email } = req.body;

    try {
      const inscricao = await CursoCasados.findOne({
        $or: [{ email1: email }, { email2: email }],
      });

      if (!inscricao) {
        throw new Error('Não encontramos nenhuma inscrição com esse e-mail.');
      }

      return res.json(inscricao);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async store(req, res) {
    const {
      nome1,
      email1,
      telefone1,
      participaCelula1,
      celula1,
      batizado1,
      nome2,
      email2,
      telefone2,
      participaCelula2,
      celula2,
      batizado2,
    } = req.body;

    try {
      if (nome1 === nome2 || email1 === email2) {
        throw new Error('Nome/E-mail não podem se repetir');
      }

      if ((participaCelula1 && !celula1) || (participaCelula2 && !celula2)) {
        throw new Error('Célula precisa ser informada');
      }

      const email1Existe = await CursoCasados.findOne({
        $or: [{ email1 }, { email2: email1 }],
      });

      if (email1Existe) {
        throw new Error('Você já fez a inscrição para esse curso');
      }

      const email2Existe = await CursoCasados.findOne({
        $or: [{ email1: email2 }, { email2 }],
      });

      if (email2Existe) {
        throw new Error('Você já fez a inscrição para esse curso');
      }

      const novoNome1 = formataNome(nome1);
      const novoNome2 = formataNome(nome2);

      const novaInscricao = await CursoCasados.create({
        nome1: novoNome1,
        email1,
        telefone1,
        participaCelula1,
        celula1,
        batizado1,
        nome2: novoNome2,
        email2,
        telefone2,
        participaCelula2,
        celula2,
        batizado2,
      });

      return res.json(novaInscricao);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async show(req, res) {
    const inscricoes = await CursoCasados.find();

    return res.json(inscricoes);
  },

  async contagem(req, res) {
    const total = await CursoCasados.find().countDocuments();

    return res.json(total);
  },
};
