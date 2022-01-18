import { Request, Response} from 'express';
import { container } from 'tsyringe'
import { ListUserUseCase } from '../listUser/ListUserUseCase'

class ListUserController {
  
  async handle(req: Request, res: Response): Promise<Response>{

    const listUserUseCase = container.resolve(ListUserUseCase)

    const all = await listUserUseCase.execute()

    return res.json(all)
  }
}

export { ListUserController }