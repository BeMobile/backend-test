import { getRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { ICreateUser, IUsersRepository } from "./IUserRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    phone,
    email,
    password
  }: ICreateUser): Promise<User> {
    const user = this.repository.create({
      name,
      phone,
      email,
      password
    });

    await this.repository.save(user);

    return user;
  } 

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

}

export { UsersRepository };