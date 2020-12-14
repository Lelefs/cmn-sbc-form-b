const removerAcentos = str => {
  return str
    .replace(/[ÀÁÂÃÄÅ]/g, 'A')
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[ÈÉÊẼË]/g, 'E')
    .replace(/[èéêẽë]/g, 'e')
    .replace(/[ÌÍÎĨÏ]/g, 'I')
    .replace(/[ìíîĩï]/g, 'i')
    .replace(/[ÒÓÔÕÖ]/g, 'O')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ÙÚÛŨÜ]/g, 'U')
    .replace(/[ùúûũü]/g, 'u');
};

module.exports = { removerAcentos };
