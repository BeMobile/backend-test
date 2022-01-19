import { Address } from "../entities/Address";


interface IAddressDTO {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
}

interface IAddressRepository {
  create({ rua, numero, bairro, cidade, cep }: IAddressDTO): Promise<Address>;
}

export { IAddressRepository, IAddressDTO }