import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";


interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUsersRepository) {
}
  async execute({ 
    email, 
    password 
  }: IRequest): Promise<void> {

    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if(userAlreadyExists) {
      throw new Error("Esse email já está em uso!")
    }
    
    const passwordHash = await hash(password, 8)

    await this.userRepository.create({ 
      email, 
      password: passwordHash
    });
  }
}

export { CreateUserUseCase }