
import User from 'App/Models/User'

export class VerifyIfExistsUsers{
    
    public async execute(email:string):Promise<User | null>{

        try {

              const user = await User
                    .query()
                    .where('email', email)
                    .firstOrFail()
                    
               return user
      
        } catch  {
            return null
        }
         

          
    }
}