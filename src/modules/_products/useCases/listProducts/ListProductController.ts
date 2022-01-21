import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { ListProductUseCase } from './ListProductUseCase';

class ListProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listProductsUseCase = container.resolve(ListProductUseCase)

    const all = await listProductsUseCase.execute()

    return res.json(all);
  }

}

export  { ListProductController }