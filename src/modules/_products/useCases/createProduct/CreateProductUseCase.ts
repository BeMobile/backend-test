import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";


interface IRequest {
  nome_livro: string;
  autor_livro: string;
  ano_livro: string;
  genero_livro: string;
  editora_livro: string;
  paginas_livro: string;
  preco: number
}

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ){}
  async execute({ 
    nome_livro,
    autor_livro,
    ano_livro,
    genero_livro,
    editora_livro,
    paginas_livro,
    preco
  }: IRequest): Promise<void> 
  {

    const productAlreadyExists = await this.productsRepository.findByName(nome_livro)

    if(productAlreadyExists) {
      throw new AppError("Livro Já Cadastrado")
    }
      await this.productsRepository.create({ 
        nome_livro,
        autor_livro,
        ano_livro,
        genero_livro,
        editora_livro,
        paginas_livro,
        preco
      }
    );
  }
}

export { CreateProductUseCase }