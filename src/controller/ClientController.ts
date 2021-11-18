import { Request, Response } from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientInputDTO, UpdateInputDTO } from "../model/Client";

export class ClientController {

    async storeClient(req: Request, res: Response){

        try {
            
           const token: string = req.headers.authorization;

            const input: ClientInputDTO ={
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

    async getAllClient(req: Request, res: Response){

        try {
            
           const token: string = req.headers.authorization;


            const result = await new ClientBusiness().getAllClient(token);

            res.status(200).send(result);

        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    async updateClient(req: Request, res: Response) {
        try {

            const token: string = req.headers.authorization;

            const input: UpdateInputDTO ={
                id: req.params.id,
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
            
            await new ClientBusiness().updateClient(input);

               
            res.status(200).send("Alterado com sucesso")

        } catch (error) { 
            res.status(400).send({ error: error.message });
        }
    }

}