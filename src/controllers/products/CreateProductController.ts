import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductService } from "../../services/Products/CreateProductService";

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      price,
      category,
      description
    } = req.body;

    const service = container.resolve(CreateProductService);

    const result = await service.execute({
      name,
      price,
      category,
      description
    });

    return res.status(201).json(result);
  }

}

export { CreateProductController };