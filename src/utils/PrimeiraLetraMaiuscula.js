const formataNome = str => {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, l => l.toUpperCase());
};

module.exports = { formataNome };
