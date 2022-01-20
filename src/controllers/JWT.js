const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

module.exports = {
  verifyJWT(req, res) {

    const token = req.headers['x-access-token'];
    
    if (!token) return res.status(401).json({ auth: false, message: 'Nenhum token fornecido.' });

    const response = jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Falha ao autenticar o token.' });

      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      return true;
    });
    return response;
  }
};
