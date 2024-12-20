import User from "../../models/users/userModel"
import {NextFunction, Request, Response} from "express"
import { DateTime } from "luxon"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import getisotime from "../../../src/utils"

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
    const user = await User.findOne({email:email})
   
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
    console.log(token, "kkkkk")
    let updated = await User.findByIdAndUpdate(user?._id, { isLoggedIn: true, updated_at: date, updated_by: user?._id, time_zone: timezone, token }, { new: true })

     res.status(200).json({message:"user signed in successfully", result:updated})
  } catch (error) {
     res.status(500).json({message:"something wrong could not sign in"})
  }
}


