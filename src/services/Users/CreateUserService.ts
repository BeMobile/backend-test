import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../errors/AppError";
import { User } from "../../models/User";
import { IUsersRepository } from "../../repositories/IUserRepository";

interface ICreateUser {
  name: string;
  phone: number;
  email: string;
  password: string;
  passwordConfirmation: string;
}

@injectable()
class CreateUserService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    phone,
    email,
    password,
    passwordConfirmation
  }: ICreateUser): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) throw new AppError("User already exists");

    if (password.length < 8) throw new AppError("Password must be at least 8 characters");
    
    if (password.search(/[A-Z]/) < 0) throw new AppError("Password must have at least one upper case character");

    if (password.search(/[a-z]/) < 0) throw new AppError("Password must have at least one lower case character");

    if (!password.match(/([0-9])/)) throw new AppError("Password must have at least a number");

    if (!password.match(/([!, %, &, @, #, $, ^, *, ?, _, ~])/)) throw new AppError("Password must have at least one special character"); 

    if (password !== passwordConfirmation) throw new AppError("Password do not match");

    const passwordHash = await hash(password, 8);

    const user: User = await this.usersRepository.create({
      name,
      email,
      phone,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserService };