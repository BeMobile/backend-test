// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

import { VerifyIfExistsUsers } from 'App/Service/VerifyIfExistUserByEmail'
import AppError from 'App/Exceptions/AppError'

export default class AuthController {

    public async auth({ auth, request, response }) {
        const { email, senha } = request.body()
        const verifyUser = new VerifyIfExistsUsers()

        const user = await verifyUser.execute(email)

        if(!user){
            throw  new AppError('email ou senha errado',400)
        } 

        if (!(await Hash.verify(String(user?.senha), senha))) {
            throw  new AppError('email ou senha errado',400)
        }

        const token = await auth.use('api').generate(user)

        return response.json({
            token,
            user
        }) 
    }
}