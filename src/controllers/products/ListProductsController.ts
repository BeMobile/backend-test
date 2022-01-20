import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProductsService } from "../../services/Products/ListProductsService";

class ListProductsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = container.resolve(ListProductsService);

    const result = await service.execute();

    return res.status(200).json(result);
  }
}

export { ListProductsController };