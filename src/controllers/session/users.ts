import User from "../../models/users/userModel"
import {NextFunction, Request, Response} from "express"
import { DateTime } from "luxon"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
// import getisotime from "../../../utils/utils"
import NotificationTokenModel from "../../models/notification/notification"
import getisotime from "../../utils/utils"
import sendNotifications from "../../utils/sendNotification"

export const getusers = async(req:Request, res:Response) => {
    try {
        const allusers = await User.find({})
        const totalCount = await User.countDocuments()      
        res.status(200).json({result:allusers, totalCount:totalCount, message:"user fetched successfully"})
      } catch (error:any) {
        res.status(500).json({message:"couldn't fetch user details"+error.message})
      }
}


export const createuser = async(req:Request, res:Response) =>{
  const {name, password, email, token="", user_type_id=""} = req.body
  try {
          console.log(req.body, "lllllllllllll")
          let hashedPassword = await bcrypt.hash(password, 12)
          const newuser = await User.create({
            name,
            password:hashedPassword,
            email,
            token,
            user_type_id:2
          }) 
          res.status(200).json({result:newuser, message:"user created successfully"})
          
        } catch (error:any) {        
          res.status(500).json({message:error.message})
        }
}

export const updateuser = async(req:Request,res:Response)=>{
  const {id, name, password, email} = req.body
  try {
    if(!id){
       res.status(200).json("id is a required field to update user")
       return
    }
    else{
      const result = await User.findByIdAndUpdate(id, {name:name, password:password, email:email}, {new:true})
      res.status(200).json({message:"user updated successfully", result})
    }
  } catch (error) {
    res.status(500).json({message:"sorry, unable to update this user please check the id"})
  }
}

export const deleteuser = async(req:Request, res:Response)=>{
  const {id} = req.body
  try {
    const result = await User.findByIdAndUpdate(id,{status:-1}, {new:true})
    res.status(200).json({message:"user deleted successfully", result})
  } catch (error) {
    res.status(500).json({message:"couldn't complete your request"})
  }
}




