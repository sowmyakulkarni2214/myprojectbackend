import { DateTime } from "luxon";
import mongoose from "mongoose";
import { ContentPointType} from "../../types/type";


const contentTypeSchema = new mongoose.Schema( {  
    
    type: { type: String ,required:true},
    type_id: { type: Number, unique:true,required:true},
    status:{type:Number, default:20},
    created_at:{type:String},
    updated_at:{type:String},
});

contentTypeSchema.pre("save", function setDateTime(next)
{   
    this.created_at = DateTime.now().toUTC().toISO()
    this.updated_at = DateTime.now().toUTC().toISO()
    next()
});

const ContentTypeModel = mongoose.model<ContentPointType>("content_type", contentTypeSchema)
export default ContentTypeModel