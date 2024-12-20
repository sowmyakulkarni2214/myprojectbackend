
import {DateTime} from 'luxon'

const getisotime = (datevalue:any) => {
    if(datevalue){
        return datevalue.now().toUTC().toISO()
    }
    else{
        return DateTime.now().toUTC().toISO()
    }
 
}

export default getisotime