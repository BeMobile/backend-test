export class Client{
    constructor(
    private id: string,
    private nome: string,
    private cpf: string,
    private telefone:  string,
    private email: string,
    private logradouro: string,
    private numero: string,
    private complemento: string,
    private bairro: string,
    private cep: string,
    private cidade: string,
    private estado: string
    ){}

}

export interface StoreInputDTO{
    nome: string,
    cpf: string,
    telefone:  string,
    email: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    token: string
}


export type client = {
    id: string,
    nome: string,
    cpf: string,
    telefone:  string,
    email: string,
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
}



