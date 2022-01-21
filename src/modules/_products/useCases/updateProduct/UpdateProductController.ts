import { Request, Response} from 'express'
import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {

  async handle(req: Request, res: Response): Promise<Response> {
    
    const { id } = req.params;
    
    const { nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco } = req.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase)

    const result = await updateProductUseCase.execute({ id, nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco  })
    
    return res.json(result).send();
  }
}

export { UpdateProductController }