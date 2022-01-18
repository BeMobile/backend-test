import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateSingupDTO, IUsersRepository } from "./IUsersRepository";

class UserRepository implements IUsersRepository {
  
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User)
  }
  
  async create({ email, password }: ICreateSingupDTO): Promise<void> {
    
    const user = this.repository.create({
      email,
      password
    })
    await this.repository.save(user)
  }

  async list(): Promise<User[]> {
    const user = await this.repository.find();
    return user;
  }

  async findByEmail(email: string): Promise<User>{
    const user =  await this.repository.findOne({ email })
    return user;
  }
}

export { UserRepository }