import Cliente from 'App/Models/Cliente'


export class VerifyIfExistsClient {

    public async execute(id: string):Promise<Cliente | null> {

        try {
            const cliente = await Cliente
                .query()
                .where('id', id)
                .firstOrFail()

            return cliente
        } catch {
             return null
        }

    }
}