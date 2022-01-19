const isPasswordFormatInvalid = (password) => {
  return !password.match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
  );
};

module.exports = isPasswordFormatInvalid;
