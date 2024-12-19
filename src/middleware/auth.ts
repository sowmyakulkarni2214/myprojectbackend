import {Request,Response,NextFunction} from "express"
import  session  from 'express-session';
import jwt from "jsonwebtoken"
import User from "../models/users/userModel"


// const auth= async(req:Request,res:Response,next:NextFunction) =>{
//     let newToken
//     if(req.session.token){
//         newToken = req.session.token
//     }else {  
//         if (req.headers.authorization) {
//             let objs = req.headers.authorization.replace("Bearer", "");           
//             newToken = objs.trim()
//         }
//     let secret = process.env.DB_AUTH_SECRET
//         if(newToken && secret){
//             let user:any = jwt.verify(newToken,secret) 
//             req.user = user
                  
//             if(user){
//                 const user_doc = await User.findOne({email:user, token:newToken})
//                 if(user_doc){
//                     res.status(500).json({message:"authorized user", user_doc})
//                     next()
//                 }
//                 else{
//                     res.status(500).json({message:"unauthorized user access denied"})
//                 }
//             }
//             } 
//         }
// }
// export default auth