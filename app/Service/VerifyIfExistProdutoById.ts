import Produto from 'App/Models/Produto'

export class VerifyIfExistsProdutoById{
    
    public async execute(id:number):Promise<Produto | null>{
        try {
            
           const produto = await Produto
           .query()
           .where('id', id)
           .firstOrFail()
           

           return produto

        } catch {
            return null
        }
    }
}