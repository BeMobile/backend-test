import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { DeletedProductUseCase } from './DeletedProductUseCase';

class DeletedProductController {

  async handle(req: Request, res: Response): Promise<Response>{
    const { id } = req.params

    const deletedProductUseCase = container.resolve(DeletedProductUseCase)

    const deletedProduct = deletedProductUseCase.execute(id)

    return res.status(200).json(deletedProduct)
  }
}

export { DeletedProductController }