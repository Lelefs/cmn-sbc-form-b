const EscolaMinisterial = require('../models/EscolaMinisterial');
const EscolaMinisterialService = require('../services/EscolaMinisterialService');

module.exports = {
  async index(req, res) {
    try {
      const { usuario } = await EscolaMinisterialService.listar(req.body);

      return res.json(usuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async show(req, res) {
    const usuarios = await EscolaMinisterial.find();

    return res.json(usuarios);
  },

  async store(req, res) {
    try {
      const { novoUsuario } = await EscolaMinisterialService.criar(req.body);

      return res.json(novoUsuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
