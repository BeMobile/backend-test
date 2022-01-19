import { Router } from "express";
// import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListUserController } from "../modules/_users/useCases/listUser/ListUserController";
import { CreateUserController } from "../modules/_users/useCases/createUser/CreateUserController";


const userRoutes = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

// userRoutes.use(ensureAuthenticated)

userRoutes.post('/',createUserController.handle);

userRoutes.get('/', listUserController.handle)

export { userRoutes }