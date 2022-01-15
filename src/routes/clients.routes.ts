import { Router } from "express";
import { ClientsRepository } from "../repositories/ClientsRepository";
import { CreateClientService } from "../services/CreateClientService";

const clientsRoutes = Router();

const clientRepository = new ClientsRepository();

clientsRoutes.post('/clients', (req, res) => {
  const { nome, cpf, andress: {street, number, district, city, cep} } = req.body;

  const createClientService = new CreateClientService(clientRepository)

  createClientService.execute({nome, cpf, andress: {street, number, district, city, cep}})
  
  return res.status(201).send();
});

clientsRoutes.get('/clients', (req, res) => {
  const allClients = clientRepository.list()

  return res.json({allClients});
})
export { clientsRoutes }