import { Request, Response } from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { StoreInputDTO } from "../model/Client";

export class ClientController {

    async storeClient(req: Request, res: Response){

        try {
            
           const token: string = req.headers.authorization;

            const input: StoreInputDTO ={
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email,
                logradouro: req.body.logradouro,
                numero: req.body.numero, 
                complemento: req.body.complemento, 
                bairro: req.body.bairro, 
                cep: req.body.cep, 
                cidade: req.body.cidade, 
                estado: req.body.estado,
                token
            }

            await new ClientBusiness().storeClient(input);

            res.status(201).send("Cliente cadastrado");

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

}