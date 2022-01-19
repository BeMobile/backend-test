import { getRepository, Repository } from "typeorm";
import { Address } from "../entities/Address";
import { IAddressDTO, IAddressRepository } from "./IAddressRepository";

class AddressRepository implements IAddressRepository{

  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address)
  }

  async create({  
    rua, 
    numero, 
    bairro, 
    cidade, 
    cep,
  }: IAddressDTO): Promise<Address> {
    const address = this.repository.create({
    rua, 
    numero, 
    bairro, 
    cidade, 
    cep,
    });

    await this.repository.save(address);

    return address;
  }
}

export { AddressRepository }
