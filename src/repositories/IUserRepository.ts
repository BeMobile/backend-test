import { User } from "../models/User";

export interface ICreateUser {
  id?: string;
  name: string;
  phone: number;
  email: string;
  password: string;
}

interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;
  findByEmail(email:string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };