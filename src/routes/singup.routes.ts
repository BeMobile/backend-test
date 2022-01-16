import { Router } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { UserRepository } from "../modules/_users/repositories/UserRepository";

const routes = Router();
const userRepository = new UserRepository();

routes.post('/singup', (req, res) => {
  const { email, password } = req.body;

  const createUserService = new CreateUserService(userRepository)

  createUserService.execute({ email, password})

  return res.status(201).send();
});

routes.get('/singup', (req, res) => {
  const allUsers = userRepository.list()

  return res.json({allUsers});
})
export { routes }