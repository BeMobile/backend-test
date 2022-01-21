import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {

async handle(req: Request, res: Response): Promise<Response> {
    const { nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco } = req.body;

    const createProductUseCase = container.resolve(CreateProductUseCase)
    
    await createProductUseCase.execute({ nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco })

    return res.status(201).send();
  }
}
export { CreateProductController }