import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Entity({
  synchronize: true,
  schema: 'sales',
})
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, type: 'varchar', length: 64 })
  recoverToken: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: false, default: true })
  status: boolean;

  @OneToOne(() => ClientEntity, (client) => client.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  client: ClientEntity;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
