import * as jwt from "jsonwebtoken"
import dotenv from 'dotenv';
import { AuthenticationData } from "../model/User";


dotenv.config()

export class Authenticator {
   generateToken = (
      payload: AuthenticationData
   ): string => {
      return jwt.sign(
         payload,
         process.env.JWT_KEY as string,
         {
            expiresIn: process.env.EXPIRES_IN
         }
      )
   }

   getTokenData = (
      token: string
   ): AuthenticationData => {
      return jwt.verify(
         token,
         process.env.JWT_KEY as string
      ) as AuthenticationData
   }

}
