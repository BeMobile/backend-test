import { Router } from "express";

import { CreateClientController } from "../controllers/Clients/CreateClientController";
import { DeleteClientController } from "../controllers/Clients/DeleteClientController";
import { ListClientsController } from "../controllers/Clients/ListClientsController";
import { UpdateClientController } from "../controllers/Clients/UpdateClientController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const listClientsController = new ListClientsController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

clientsRoutes.post("/", ensureAuthenticated, createClientController.handle);
clientsRoutes.get("/list", ensureAuthenticated, listClientsController.handle);
clientsRoutes.put("/update/:id", ensureAuthenticated, updateClientController.handle);
clientsRoutes.delete("/delete/:id", ensureAuthenticated, deleteClientController.handle);

export { clientsRoutes };