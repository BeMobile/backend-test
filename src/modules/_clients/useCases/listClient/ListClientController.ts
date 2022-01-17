import { Request, Response } from "express";
import { ListClientUseCase } from "./ListClientUseCase";

class ListClientController {
  constructor(private listClientUseCase: ListClientUseCase) {}

  handle(req: Request, res: Response): Response {
    const all = this.listClientUseCase.execute();

    return res.json(all)
  }
}

export { ListClientController }