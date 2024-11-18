import { DateTime } from "luxon";
import mongoose from "mongoose";
import { StatusType} from "../../types/type";


const statusTypeSchema = new mongoose.Schema( {
    status_type_id:{type:Number, required:true, unique:true},
    status_type: { 
        type: String, 
        required: true 
      },
    created_at:{type:String},
    updated_at:{type:String}
});

statusTypeSchema.pre("save", function setDateTime(next)
{   
    this.created_at = DateTime.now().toUTC().toISO()
    this.updated_at = DateTime.now().toUTC().toISO()
    next()
});

const StatusTypeModel = mongoose.model<StatusType>("StatusType", statusTypeSchema)
export default StatusTypeModel

