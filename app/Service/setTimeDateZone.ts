import { parseISO, getDate,getHours } from 'date-fns' 

import { toDate, format } from 'date-fns-tz'


export class SetTimeDateZone{

   public  execute(date) {
        const parisDate = toDate(date)
        const pattern = "yyyy-MM-dd"
        const timeOutput = format(parisDate, pattern, { timeZone: 'UTC/GMT+1' })
        return timeOutput
      }

}