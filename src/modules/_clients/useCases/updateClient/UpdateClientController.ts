import { Request, Response} from 'express';
import { container } from 'tsyringe';
import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {

  async handle(req: Request, res: Response): Promise<Response>{

    const { id } = req.params;
    
    const { nome, telefone, rua, bairro, numero, cidade, cep } = req.body;

    const updateClienteUseCase = container.resolve(UpdateClientUseCase);

    const result = await updateClienteUseCase.execute({id, nome, telefone, rua, bairro, numero, cidade, cep})

    return res.json(result).send();
  }
}

export { UpdateClientController }