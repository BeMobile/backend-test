import { Router } from "express";
import { CreateClientController } from "../modules/_clients/useCases/createClient/CreateClientController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListClienteController } from "../modules/_clients/useCases/listClient/ListClientController";
import { UpdateClientController } from "../modules/_clients/useCases/updateClient/UpdateClientController";
import { DeleteClientController } from "../modules/_clients/useCases/deleteClient/DeleteClientController";


const clientsRoutes = Router()

const createClientController = new CreateClientController();

const listClientController = new ListClienteController();

const updateClienteUseCase = new UpdateClientController();

const deleteClientController = new DeleteClientController();

clientsRoutes.use(ensureAuthenticated)

clientsRoutes.post('/', createClientController.handle )

clientsRoutes.get('/', listClientController.handle )

clientsRoutes.put('/update/:id', updateClienteUseCase.handle )

clientsRoutes.delete('/delete/:id', deleteClientController.handle )

export { clientsRoutes }