import { Router } from "express";
import { CreateClientController } from "../modules/_clients/useCases/createClient/CreateClientController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListClienteController } from "../modules/_clients/useCases/listClient/ListClientController";


const clientsRoutes = Router()

const createClientController = new CreateClientController();

const listClientController = new ListClienteController

clientsRoutes.use(ensureAuthenticated)

clientsRoutes.post('/', createClientController.handle )

clientsRoutes.get('/', listClientController.handle )

export { clientsRoutes }