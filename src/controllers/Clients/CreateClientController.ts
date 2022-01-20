import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientService } from "../../services/Clients/CreateClientService";

class CreateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      phone,
      cpf,
      email,
      address,
      city
    } = req.body;

    const service = container.resolve(CreateClientService);

    const client = await service.execute({
      name,
      phone,
      cpf,
      email,
      address,
      city
    });

    return res.status(201).json(client);
  }
}

export { CreateClientController };