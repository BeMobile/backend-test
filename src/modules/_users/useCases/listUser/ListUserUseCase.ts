import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class ListUserUseCase {
  constructor(private userRepository: IUsersRepository) {}
  execute(): User[] {
    const users = this.userRepository.list();

    return users;
  }
}
export { ListUserUseCase }