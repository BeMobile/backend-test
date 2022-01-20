import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteClientService } from "../../services/Clients/DeleteClientService";

class DeleteClientController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(DeleteClientService);

    const result = await service.execute(Number(id));

    return res.status(200).send("Client deleted");
  }
}

export { DeleteClientController };