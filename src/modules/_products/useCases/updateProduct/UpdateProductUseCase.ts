import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { Products } from "../../entities/Products";
import { IProductsRepository } from "../../repositories/IProductsRepository";

interface IUpdateProductDTO {
  id: string;
  nome_livro?: string;
  autor_livro?: string;
  ano_livro?: string;
  genero_livro?: string;
  editora_livro?: string;
  paginas_livro?: string;
  preco?: number;
}

@injectable()
class UpdateProductUseCase {

  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository){}

  async execute({
    id,
    nome_livro,
    autor_livro,
    ano_livro,
    genero_livro,
    editora_livro,
    paginas_livro,
    preco
  }: IUpdateProductDTO): Promise<Products>{

    const product = await this.productsRepository.findById(id)

    if(!product) {
      throw new AppError("Produto não cadastrado")
    }
    product.nome_livro = nome_livro ? nome_livro : product.nome_livro
    product.autor_livro = autor_livro ? autor_livro : product.autor_livro
    product.ano_livro = ano_livro ? ano_livro : product.ano_livro
    product.genero_livro = genero_livro ? genero_livro : product.genero_livro
    product.editora_livro = editora_livro ? editora_livro : product.editora_livro
    product.paginas_livro = paginas_livro ? paginas_livro : product.paginas_livro
    product.preco = preco ? preco : product.preco

    const updateProduct = await this.productsRepository.updateProduct(product)

    return updateProduct
  }
}

export { UpdateProductUseCase }