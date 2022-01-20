const isPhoneFormatInvalid = (phone) => {
  return !phone.match(
    /^(\(11\) (9\d{4})-\d{4})|((\(1[2-9]{1}\)|\([2-9]{1}\d{1}\)) [5-9]\d{3}-\d{4})$/
  );
};

module.exports = isPhoneFormatInvalid;

// testes
//  preg_match($exp_regular, '(11) 92222-2222');  OK
//  preg_match($exp_regular, '(12) 8222-2222');  OK
