import { getRepository, Repository } from "typeorm";
import { Products } from "../entities/Products"
import { ICreateProductDTO, IProductsRepository, IUpdateProductDTO } from "./IProductsRepository";

class ProductsRepository implements IProductsRepository {
  
  private repository: Repository<Products>;

  constructor() {
    this.repository = getRepository(Products)
  }
  
  async create({ 
    nome_livro, 
    autor_livro, 
    ano_livro, 
    genero_livro, 
    editora_livro, 
    paginas_livro,
    preco,
  }: ICreateProductDTO): Promise<Products> {
    
  const product = this.repository.create({
      nome_livro, 
      autor_livro, 
      ano_livro, 
      genero_livro, 
      editora_livro, 
      paginas_livro,
      preco

    })
    await this.repository.save(product)

    return product;
  }
  async findByName(nome_livro: string): Promise<Products> {
    const product = await this.repository.findOne({nome_livro})
    return product
  }

  async findById(id: string): Promise<Products> {
      const product = await this.repository.findOne({id})
      return product
  }

  async list(): Promise<Products[]> {
    const productInfo = await this.repository.find({select:["id","nome_livro", "autor_livro", "paginas_livro", "preco"], order: {nome_livro: "ASC" }});
    return productInfo;
  }

  async listDetail(id: string): Promise<Products> {
    return await this.repository.findOne(id)
  }

  async updateProduct({id, nome_livro, autor_livro, ano_livro, genero_livro, editora_livro, paginas_livro, preco}: IUpdateProductDTO): Promise<Products>{
    await this.repository
    .createQueryBuilder()
    .update(Products)
    .set({ nome_livro: nome_livro, autor_livro: autor_livro, ano_livro: ano_livro, genero_livro: genero_livro, editora_livro: editora_livro, paginas_livro: paginas_livro, preco: preco })
    .where("id = :id", {id: id})
    .execute()

    const clientUpdate = await this.repository.findOne({ id });

    return clientUpdate
  }
  async deletedProduct(id: string, deleted: boolean): Promise<void> {
    await this.repository.softDelete({id, deleted})
  }

  }

export { ProductsRepository }