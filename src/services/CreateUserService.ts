import { UserRepository } from "../repositories/UserRepository";

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {

  constructor(private userRepository: UserRepository) {

  }
  execute({ email, password }: IRequest): void {
    const emailAllReadyExists = this.userRepository.findByEmail(email);

    if (emailAllReadyExists) {
      throw new Error("Email Already Exists!")
    }

    this.userRepository.create({ email, password });
  }
}

export { CreateUserService }