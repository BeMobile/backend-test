import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ListUserUseCase {
  constructor(
  @inject("UserRepository")
  private userRepository: IUsersRepository) {}
  async execute(): Promise<User[]> {
    const users = await this.userRepository.list();

    return users;
  }
}
export { ListUserUseCase }