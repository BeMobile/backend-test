import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { ShowProductUseCase } from './ShowProductUseCase';

class ShowProductController {
  async handle(req: Request, res: Response): Promise<Response> {

    const { id } = req.params;

    const showProductUseCase = container.resolve(ShowProductUseCase)

    const all = await showProductUseCase.execute(id)

    return res.status(200).json(all);
  }

}

export  { ShowProductController }