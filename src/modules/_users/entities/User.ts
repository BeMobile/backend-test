import {v4 as uuidV4} from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity("user")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User }

function DataColumn() {
  throw new Error('Function not implemented.');
}
