import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientsService } from "../../services/Clients/ListClientsService";

class ListClientsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListClientsService);

    const result = await service.execute();

    return res.status(200).send(result);
  }
}

export { ListClientsController };