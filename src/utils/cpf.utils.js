const isCpfFormatInvalid = (cpf) => {
  return !cpf.match(
    /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/
  );
};

module.exports = isCpfFormatInvalid;
