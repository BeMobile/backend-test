import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {

  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(req: Request, res: Response): Response {
    const { email, password } = req.body;

    this.createUserUseCase.execute({ email, password })

    return res.status(201).send();
  }
}

export { CreateUserController }