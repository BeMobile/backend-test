import jwt from 'jsonwebtoken';
import User from '../models/User';

class UserController {
  async signUp(req, res) {
    try {
      const { email } = req.body;
      const verify = await User.findAll({ where: { email } });
      if (verify.length > 0) {
        res.status(400).json({
          message: ['This email already exists'],
        });
      }
      const newUser = await User.create(req.body);
      const { id } = newUser;
      res.json({ id, email });
    } catch (e) {
      res.status(400).json({ message: `Ocorreu um erro${e}` });
    }
  }

  async signIn(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: ['Invalid credencials'],
      });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({
        message: 'User not found, please sign up',
      });
    }
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        message: ['Auth error'],
      });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ message: `Welcome user ${email}`, token });
  }
}

export default new UserController();
