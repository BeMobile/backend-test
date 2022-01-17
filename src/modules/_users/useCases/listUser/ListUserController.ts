import { Request, Response} from 'express';
import { ListUserUseCase } from '../listUser/ListUserUseCase'


class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}
  
  handle(req: Request, res: Response): Response{
    const all = this.listUserUseCase.execute()

    return res.json(all)
  }
}

export { ListUserController }