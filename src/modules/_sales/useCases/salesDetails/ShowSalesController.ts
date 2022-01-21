import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { ShowSalesUseCase } from './ShowSalesUseCase';

class ShowSaleController {
  async handle(req: Request, res: Response): Promise<Response>{

    const { id } = req.params;

    const showSalesUseCase  = container.resolve(ShowSalesUseCase)
    
    const saleDetails = await showSalesUseCase.execute(id)

    return res.json(saleDetails) 
  }
}

export { ShowSaleController }