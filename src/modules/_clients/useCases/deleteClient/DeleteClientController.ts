import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClientUseCase } from './DeleteClientUseCase';

class DeleteClientController {

  async handle(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase)

    const deletedClient = deleteClientUseCase.execute(id)

    return res.status(200).json(deletedClient)
  }
}

export { DeleteClientController }