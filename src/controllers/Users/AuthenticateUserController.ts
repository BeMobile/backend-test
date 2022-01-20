import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "../../services/Users/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const service = container.resolve(AuthenticateUserService);

    const result = await service.execute({ email, password });

    return res.status(200).json(result);
  }
}

export { AuthenticateUserController };