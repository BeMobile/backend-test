import { User } from "../model/User";
import { ICreateSingupDTO, IUsersRepository } from "./IUsersRepository";

class UserRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UserRepository

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UserRepository {
    if(!UserRepository.INSTANCE) {
      UserRepository.INSTANCE = new UserRepository();
    }
    return UserRepository.INSTANCE;
  }

  create({ email, password }: ICreateSingupDTO): void {
    const createUser = new User();
    Object.assign(createUser, {
      email,
      password,
      created_at: new Date()
    });
    this.users.push(createUser)
  }

  list(): User[] {
    return this.users
  }

  findByEmail(email: string): User{
    const findEmail = this.users.find((femail) => femail.email === email);
    return findEmail;
  }
}

export { UserRepository }