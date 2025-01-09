import express from "express"
import UserModel from "../../models/users/userModel"
import NotificationTokenModel from "../../models/notification/notification"
import { DateTime } from "luxon"
import {NextFunction, Request, Response} from "express"

export const addToken = async(req:Request, res:Response)=>{
    const {token, user_id} = req.body
    console.log(token, user_id, "llllllllll")
    const result = null
    try {
      if(!user_id){
        return res.status(500).json({message:"user field is required"})
      }
      if(!token){
        return res.status(500).json({message:"token is blank"})
      }
      const userDoc = await UserModel.findById(user_id)
      console.log(userDoc, "user.........")
      if(userDoc)
        {
        const result = await NotificationTokenModel.findByIdAndUpdate(
          user_id, {
          user_id:user_id,
          token:token,
          updated_at:DateTime.now().toUTC().toISO()
        },{new:true})
    
      }
      
   
      res.status(200).json({message:"token added successfully", result})
    } catch (error) {
      res.status(500).json({message:"couldn't complete your request"})
    }
  }