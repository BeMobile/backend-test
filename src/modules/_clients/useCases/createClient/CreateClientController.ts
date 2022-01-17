import { Request, Response } from 'express';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  constructor(private createClientUseCase: CreateClientUseCase) { }

  handle(req: Request, res: Response) {
    const { nome, cpf, andress: { street, number, district, city, cep } } = req.body;

    this.createClientUseCase.execute({ nome, cpf, andress: { street, number, district, city, cep } })

    return res.status(201).send();
  }
}

export { CreateClientController }