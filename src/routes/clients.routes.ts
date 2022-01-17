import { Router } from "express";
import { createClientController } from "../modules/_clients/useCases/createClient";
import { listClientController } from "../modules/_clients/useCases/listClient";

const clientsRoutes = Router();

clientsRoutes.post('/clients', (req, res) => {
  return createClientController.handle(req, res);
});

clientsRoutes.get('/clients', (req, res) => {
  return listClientController.handle(req, res)
})
export { clientsRoutes }