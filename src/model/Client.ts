export class Client{
    constructor(
    private id: string,
    private nome: string,
    private cpf: string,
    private telefone:  string,
    private email: string,
    private logradouro: string,
    private numero: number,
    private complemento: string,
    private bairro: string,
    private cep: string,
    private cidade: string,
    private estado: string
    ){}

    getId(){
        return this.id
    }

    setNome(nome: string){
        this.nome = nome;
    }

    setCpf(cpf: string){
        this.cpf = cpf;
    }

    setTelefone(telefone: string){
        this.telefone = telefone;
    }

    setEmail(email: string){
        this.email = email;
    }

    setLogradouro(logradouro: string){
        this.logradouro = logradouro;
    }

    setNumero(numero: number){
        this.numero = numero;
    }

    setComplemento(complemento: string){
        this.complemento = complemento;
    }

    setBairro(bairro: string){
        this.bairro = bairro;
    }

    setCep(cep: string){
        this.cep = cep;
    }

    setCidade(cidade: string){
        this.cidade = cidade;
    }

    setEstado(estado: string){
        this.estado = estado;
    }

}

export interface ClientInputDTO{
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

export interface ClientOutputDTO{
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

export interface UpdateInputDTO{
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
    estado: string,
    token: string
}





