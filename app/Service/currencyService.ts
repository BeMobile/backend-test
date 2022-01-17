
export class CurrencyService{

    public  execute(number:number) {

            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'BRL' })
                           .format(number)

          } 
       
 }