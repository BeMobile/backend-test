import { Router } from "express";
import { createUserController } from '../modules/_users/useCases/createUser'
import { listUserController } from "../modules/_users/useCases/listUser";

const routes = Router();

routes.post('/singup', (req, res) => {
  return createUserController.handle(req, res) 
});

routes.get('/singup', (req, res) => {
  return listUserController.handle(req, res)
})
export { routes }