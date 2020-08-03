const formataNome = str => {
  return str
    .toLowerCase()
    .replace(/(?:^|\s)(?!da |de |do |das |des |dos )\S/g, l => l.toUpperCase());
};

module.exports = { formataNome };
