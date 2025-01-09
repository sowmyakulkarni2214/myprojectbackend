import { DateTime } from "luxon";
import mongoose from "mongoose";
import { NotificationTokenType, User} from "../../types/type";


const userSchema = new mongoose.Schema( {
    name:{type:String, required:true},
    email:{type:String,required:true},
    // email_verified:{type:Boolean, default:false},
    // email_verified_at:{type:String},
    // verification_code:{type:String},
    password:{type:String},
    status:{type:Number, default:1},
    created_at:{type:String},
    updated_at:{type:String},
    user_type_id:{type: Number, default: 2},
    token:{type:String},
    isLoggedIn :{type:Boolean},
    timezone:{type:String}
    
});

userSchema.pre("save", function setDateTime(next)
{   
    this.created_at = DateTime.now().toUTC().toISO()
    this.updated_at = DateTime.now().toUTC().toISO()
    next()
});

const UserModel = mongoose.model<User>("User", userSchema)
export default UserModel




