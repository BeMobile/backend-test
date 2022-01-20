import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateClientService } from "../../services/Clients/UpdateClientService";

class UpdateClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      city
    } = req.body;

    const service = container.resolve(UpdateClientService);

    const result = await service.execute({
      id,
      name,
      email,
      phone,
      address,
      city
    });

    return res.status(200).send(result);
  }
}

export { UpdateClientController };