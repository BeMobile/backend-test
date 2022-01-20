import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductService } from "../../services/Products/DeleteProductService";

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(DeleteProductService);

    const result = await service.execute(id);

    return res.status(200).json(result);
  }
}

export { DeleteProductController };