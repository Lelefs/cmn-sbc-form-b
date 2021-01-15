const Staff = require('../models/Staff');
const StaffService = require('../services/StaffService');

module.exports = {
  async index(req, res) {
    try {
      const { usuario } = await StaffService.listar(req.body);

      return res.json(usuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async show(req, res) {
    const usuarios = await Staff.find();

    return res.json(usuarios);
  },

  async store(req, res) {
    try {
      const { novoUsuario } = await StaffService.criar(req.body);

      return res.json(novoUsuario);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
