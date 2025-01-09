import { DateTime } from "luxon";
import mongoose from "mongoose"
import { NotificationTokenType } from "../../types/type";

const notificationTokenSchema = new mongoose.Schema({
    user_id:{ type:String},
    token:{type:String},
    created_at:{type:String},
    updated_at:{type:String}
})
notificationTokenSchema.pre("save", function setDateTime(next)
{
    this.created_at = DateTime.now().toUTC().toISO()
    this.updated_at = DateTime.now().toUTC().toISO()
    next()
});
const NotificationTokenModel = mongoose.model<NotificationTokenType>("NotificationToken",notificationTokenSchema)
export default NotificationTokenModel