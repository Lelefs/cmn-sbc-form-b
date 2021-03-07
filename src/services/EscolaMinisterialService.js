const { isAfter } = require('date-fns');
const EscolaMinisterial = require('../models/EscolaMinisterial');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { removerAcentos } = require('../utils/RemoverAcentos');

const criar = async data => {
  const nome = await removerAcentos(formataNome(data.nome));
  const celula = await removerAcentos(formataNome(data.celula));
  const { telefone, tempoComunidade } = data;
  const hoje = new Date();
  const dataFinal = new Date(2021, 2, 14, 20, 59, 59);

  if (isAfter(hoje, dataFinal)) {
    throw new Error(
      'Não foi possível completar sua inscrição. Já expirou o prazo.',
    );
  }

  const totalInscricoes = await EscolaMinisterial.find().countDocuments();

  if (totalInscricoes >= 15) {
    throw new Error(
      'Não foi possível completar sua inscrição. Vagas esgotadas.',
    );
  }

  const usuarioExiste = await EscolaMinisterial.findOne({
    nome,
    celula,
    telefone,
  });

  if (usuarioExiste) {
    throw new Error(
      'Não foi possível completar sua inscrição. Você já fez sua inscrição.',
    );
  }

  const novoUsuario = await EscolaMinisterial.create({
    nome,
    celula,
    telefone,
    tempoComunidade,
  });

  return { novoUsuario };
};

const listar = async ({ nome }) => {
  const usuario = await EscolaMinisterial.findOne({
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
