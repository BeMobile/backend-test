import {v4 as uuidV4} from 'uuid'
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity("products")
class Products {

  @PrimaryColumn()
  id?: string;

  @Column()
  nome_livro: string;

  @Column()
  autor_livro: string;

  @Column()
  ano_livro: string;

  @Column()
  genero_livro: string;

  @Column()
  editora_livro: string;

  @Column()
  paginas_livro: string;

  @Column()
  deleted: boolean;

  @Column()
  preco: number;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Products }
