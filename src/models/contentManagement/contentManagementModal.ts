import { DateTime } from "luxon";
import mongoose from "mongoose";
import { ContentType} from "../../types/type";


const contentManagementSchema = new mongoose.Schema( {
    type: {type:Number, required:true},
    title:{type:String},
    header:{type:String},
    footer:{type:String},
    points:[{
        point: { type: String },
        status: { type: Number, default: 11 }
    }],
    content:{type:String},
    status: { type: Number, default: 9},
    order:{type:Number},
    created_at:{type:String},
    updated_at:{type:String},

});

contentManagementSchema.pre("save", function setDateTime(next)
{   
    this.created_at = DateTime.now().toUTC().toISO()
    this.updated_at = DateTime.now().toUTC().toISO()
    next()
});

const ContentManagementModel = mongoose.model<ContentType>("ContentManagement", contentManagementSchema)
export default ContentManagementModel