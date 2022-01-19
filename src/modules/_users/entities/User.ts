import {v4 as uuidV4} from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { AppError } from '../../../errors/AppError';

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
  throw new AppError('Function not implemented.');
}
