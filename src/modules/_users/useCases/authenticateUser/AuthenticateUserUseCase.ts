import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {

  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository){}

  async execute({ email, password }: IRequest): Promise<IResponse>  {
    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new AppError("Email ou Senha Incorreto")
    }
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new AppError("Email ou Senha Incorreto")
    }
    const token = sign({}, "1614ff4a774dcbfd8ab596319d1086a2", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email
      }
    }

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase }