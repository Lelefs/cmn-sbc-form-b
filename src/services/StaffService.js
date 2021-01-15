const { isAfter } = require('date-fns');
const Staff = require('../models/Staff');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');

const criar = async data => {
  const nome = await formataNome(data.nome);
  const celula = data.celula.toLowerCase();
  const hoje = new Date();
  const dataFinal = new Date(2021, 1, 3, 20, 59, 59);

  if (isAfter(hoje, dataFinal)) {
    throw new Error(
      'Não foi possível completar sua inscrição. Já expirou o prazo.',
    );
  }

  const { idade, batizado, aptidoes, telefone } = data;

  const usuarioExiste = await Staff.findOne({ $or: [{ nome }, { telefone }] });

  if (usuarioExiste) {
    throw new Error('Já existe um usuário cadastrado com esse nome/telefone.');
  }

  const novoUsuario = await Staff.create({
    nome,
    celula,
    idade,
    batizado,
    aptidoes,
    telefone,
  });

  return { novoUsuario };
};

const listar = async ({ nome }) => {
  const usuario = await Staff.findOne({
    nome: { $regex: new RegExp(`^${nome}$`, 'i') },
  });

  if (!usuario) {
    throw new Error('Nenhum usuário encontrado.');
  }

  return { usuario };
};

module.exports = {
  criar,
  listar,
};
