 import { parseISO, getHours } from 'date-fns' 
import { toDate, format } from 'date-fns-tz'

export class SetTimeHoursZone{
       
   public execute(date) {
        const parisDate = toDate(date)
        const pattern = 'HH:mm'
        const timeOutput = format(parisDate, pattern, { timeZone: 'UTC/GMT+1' })
        return timeOutput
      }
}