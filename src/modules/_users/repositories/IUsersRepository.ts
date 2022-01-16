import { User } from "../model/User";

interface ICreateSingupDTO {
  email: string;
  password: string;
}
interface IUsersRepository {
  findByEmail(email: string): User;
  list(): User[];
  create({ email, password }: ICreateSingupDTO): void;
}

export { IUsersRepository, ICreateSingupDTO }