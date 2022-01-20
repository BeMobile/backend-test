import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductService } from "../../services/Products/UpdateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {
      name,
      price,
      category,
      description
    } = req.body;

    const service = container.resolve(UpdateProductService);

    const result = await service.execute({
      id,
      name,
      price,
      category,
      description
    });

    return res.status(200).json(result);
  }
}

export { UpdateProductController };