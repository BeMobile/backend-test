import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AppError extends Exception {

  public async handle(error: this, ctx: HttpContextContract) {
    ctx.response.status(error.status).json({
        message:error.message,
        code:error.status
    })
  }

}