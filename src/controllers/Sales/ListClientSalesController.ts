import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListClientSalesService } from "../../services/Sales/ListClientSalesService";

class ListClientSalesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { client_id } = req.body;

    const service = container.resolve(ListClientSalesService);

    const result = await service.execute(client_id);

    return res.status(200).json(result);
  }
}

export { ListClientSalesController };