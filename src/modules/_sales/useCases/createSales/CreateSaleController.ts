import { Request, Response }  from 'express'
import { container } from 'tsyringe';
import { CreateSaleUseCase } from './CreateSaleUseCase';

class CreateSaleController {

  async handle(req: Request, res: Response): Promise<Response>{
    const { id_client, id_product, quantity} = req.body;

    const createSaleUseCase = container.resolve(CreateSaleUseCase)

    const result = await createSaleUseCase.execute({ id_client, id_product, quantity })

    return res.status(201).json(result)
  }
}

export { CreateSaleController }