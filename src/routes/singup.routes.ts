import { Router } from "express";
import { ListUserController } from "../modules/_users/useCases/listUser/ListUserController";
import { CreateUserController } from "../modules/_users/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

userRoutes.post('/singup',createUserController.handle);

userRoutes.get('/singup', listUserController.handle)
export { userRoutes }