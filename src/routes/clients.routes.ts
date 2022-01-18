import { Router } from "express";
import { CreateClientController } from "../modules/_clients/useCases/createClient/CreateClientController";

const clientsRoutes = Router()

const createClientController = new CreateClientController();

clientsRoutes.post('/clients', createClientController.handle )

export { clientsRoutes }