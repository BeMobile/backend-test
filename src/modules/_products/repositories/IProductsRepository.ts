import { Products } from "../entities/Products";

interface ICreateProductDTO {
  nome_livro: string;
  autor_livro: string;
  ano_livro: string;
  genero_livro: string;
  editora_livro: string;
  paginas_livro: string;
  preco: number;
}

interface IUpdateProductDTO {
  id?: string
  nome_livro?: string;
  autor_livro?: string;
  ano_livro?: string;
  genero_livro?: string;
  editora_livro?: string;
  paginas_livro?: string;
  preco?: number;
}

interface IProductsRepository {
  findByName(name: string): Promise<Products>
  findById(id: string): Promise<Products>
  create({ nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco}: ICreateProductDTO): Promise<Products>; 
  list(): Promise<Products[]>;
  listDetail(id: string): Promise<Products>
  updateProduct({ id, nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco}: IUpdateProductDTO): Promise<Products>;
  deletedProduct(id: string, deleted: boolean): Promise<void>
}

export { IProductsRepository, ICreateProductDTO, IUpdateProductDTO }