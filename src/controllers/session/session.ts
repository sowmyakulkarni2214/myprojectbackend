import { Request, Response } from "express";
import getisotime from "../../utils/utils";
import UserModel from "../../models/users/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { DateTime } from "luxon";
import generateOTP from "../../utils/generateOTP";
import MailSendCustomer from "../email/email";
export const signin = async(req:Request, res:Response)=>{
    console.log("detials", req.body);
    
    
    const {email, password, timezone=""} = req.body 
    let secret = process.env.DB_AUTH_SECRET
    let date = getisotime(DateTime)
  
    
    if(!email){
        res.status(400).json({ message: "Email is required" })
        return
    }
     if(!password){
       res.status(400).json({ message: "password is required" })
    return
   }
    
    try {
      const user = await UserModel.findOne({email:email})
     
      console.log(user, "llll")
      if(!user){
         res.status(400).json({ message: "user with this email does not exist" })
         return
      }
      if(user?.status != 1){
         res.status(400).json({message:"user access is denied"})
         return
      }
     
      const isPasswordCorrect = await bcrypt.compare(password, String(user.password)) 
  
      console.log(isPasswordCorrect)
      if(!isPasswordCorrect){
         res.status(400).json({message:"password is incorrect"})
         return
      }
      console.log("kkjjjjjjj")
      let token
    
      if(secret) {
       
          token = jwt.sign({ email, user_id: user?._id, user_type_id: user?.user_type_id }, secret);
          console.log("token", token)
          // req.session.token = token
          // console.log("token", req.session.token)
      }
      
      const code = await generateOTP()
      var sendMail = {
        from: `Science process.env.EMAIL_USERNAME}`,
        to: req.body.email,
        subject: "Email verification",
        template: "sendEmail",
        context: {
            user_name: name,
            code,
            title: "Verify Your E-mail Address",
            content: "Verify you email address",
            api_url: process.env.API_URL

        }
    };

        MailSendCustomer(sendMail)
      let updated = await UserModel.findByIdAndUpdate(user?._id, { isLoggedIn: true, updated_at: date, updated_by: user?._id, time_zone: timezone, token }, { new: true })
    //   let pushToken:any = await NotificationTokenModel.findOne({user_id:updated?._id})
    //   let title = "Welcome"
    //   let message = "welcome to my-app"
    //   let notification = await sendNotifications({pushToken, title, message})
     
       res.status(200).json({message:"user signed in successfully", result:updated})
      
     
    } catch (error) {
       res.status(500).json({message:"something wrong could not sign in"})
    }
  }
  
