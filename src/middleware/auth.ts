import {Request,Response,NextFunction} from "express"
import  session  from 'express-session';

const auth= (req:Request,res:Response,next:NextFunction) =>{
    let newToken
    if(req.session.token){
        newToken = req.session.token
    }else {
  
        if (req.headers.authorization) {
            let objs = req.headers.authorization.replace("Bearer", "");
            console.log("inside if________", objs);
            newToken = objs.trim()
        }
    
}
}