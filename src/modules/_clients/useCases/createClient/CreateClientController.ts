import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  
  async handle(req: Request, res: Response): Promise<Response>{
    const { nome, cpf, telefone, rua, numero, bairro, cidade, cep } = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase) 

    await createClientUseCase.execute({ nome, cpf, telefone, rua, numero, bairro, cidade, cep })

    return res.status(201).send();
  }
}

export { CreateClientController }