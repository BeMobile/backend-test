import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UserRepository } from "../modules/_users/repositories/UserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token Inexistente", 401);
  }
  const [, token] = authHeader.split(" ");

  try {
   const { sub: user_id } =  verify(token, "1614ff4a774dcbfd8ab596319d1086a2") as IPayload;
   
   const userRepository = new UserRepository();

   const user = await userRepository.findById(user_id)

   if(!user) {
     throw new AppError("Usuário não Existe!", 401)
   }

   next()

  }catch{
    throw new AppError("Token Inválido", 401)
  }

}
