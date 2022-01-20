import { Router } from "express";

import { AuthenticateUserController } from "../controllers/Users/AuthenticateUserController";
import { CreateUserController } from "../controllers/Users/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

usersRoutes.post("/signup", createUserController.handle);
usersRoutes.post("/signin", authenticateUserController.handle);

export { usersRoutes };