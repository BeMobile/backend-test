import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSaleService } from "../../services/Sales/CreateSaleService";

class CreateSaleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      quantity,
      client_id,
      product_id
    } = req.body;

    const service = container.resolve(CreateSaleService);

    const result = await service.execute({
      quantity,
      client_id,
      product_id
    });

    return res.status(201).json(result);
  }
}

export { CreateSaleController };