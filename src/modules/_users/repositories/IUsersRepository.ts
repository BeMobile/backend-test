import { User } from "../entities/User";

interface ICreateSingupDTO {
  email: string;
  password: string;
}
interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  list(): Promise<User[]>;
  create({ email, password }: ICreateSingupDTO): Promise<void>;
}

export { IUsersRepository, ICreateSingupDTO }