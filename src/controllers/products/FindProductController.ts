import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindProductService } from "../../services/Products/FindProductService";

class FindProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const service = container.resolve(FindProductService);
    
    const result = await service.execute(id);

    return res.status(200).json(result);
  }
}

export { FindProductController };