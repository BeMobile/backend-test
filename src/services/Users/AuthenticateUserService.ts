import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUserRepository";

interface IAuthenticate {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IAuthenticate) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error("email or password incorrect");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new Error("email or password incorrect");

    const token = sign({}, "e2171a394509ff73270a6dee1745d4b4", {
      subject: String(user.id),
      expiresIn: 60 * 3
    });

    return token;
  }
}

export { AuthenticateUserService };