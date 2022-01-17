// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { VerifyIfExistsUsers } from 'App/Service/VerifyIfExistUserByEmail'
import AppError from 'App/Exceptions/AppError'



export default class UsersController {

    public async index({ response }: HttpContextContract) {
        return response.json(await User.all())
    }

    public async store({ request, response }: HttpContextContract) {
       const verifyUser= new VerifyIfExistsUsers()
        const { email, senha } = request.body()
        const user=await verifyUser.execute(email)

        if(!user){
            const ResponseUser = await User.create({ email, senha })

            return response.json(ResponseUser)
        }

        throw new AppError("this user  just exist!",401) 
        

    }

}
