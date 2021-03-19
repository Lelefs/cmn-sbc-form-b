const EscolaMinisterial = require('../models/EscolaMinisterial');
const { formataNome } = require('../utils/PrimeiraLetraMaiuscula');
const { removerAcentos } = require('../utils/RemoverAcentos');

const criar = async data => {
  const nome = await removerAcentos(formataNome(data.nome));
  const celula = await removerAcentos(formataNome(data.celula));
  const { telefone, tempoComunidade, liderAuxiliar, pretendeSerLider } = data;

  const totalInscricoes = await EscolaMinisterial.find().countDocuments();

  if (totalInscricoes >= 18) {
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
    liderAuxiliar,
    pretendeSerLider,
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
