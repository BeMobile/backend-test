import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "../../services/Users/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      phone,
      password,
      passwordConfirmation
    } = req.body;

    const service = container.resolve(CreateUserService);

    const user = await service.execute({
      name,
      email,
      phone,
      password,
      passwordConfirmation
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };