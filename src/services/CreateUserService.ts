import { IUsersRepository } from "../modules/_users/repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

class CreateUserService {

  constructor(private userRepository: IUsersRepository) {

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