import { DateTime } from "luxon"
import Content from "../../models/contentManagement/contentManagementModal"
import {Request, Response} from "express"


export const getContent = async(req:Request, res:Response) => {
    const {type} = req.body
    try {
        const result = await Content.find({type})
        const count = await Content.find({type}).countDocuments()
        // const totalCount = await User.countDocuments()      
        res.status(200).json({ message:"content fetched successfully", result:result, count:count})
      } catch (error:any) {
        res.status(500).json({message:"couldn't fetch content details"+error.message})
      }
}

export const addContent = async(req:Request, res:Response) => {
  const {type, content="", point=[], header="", footer="", title=""} = req.body
  console.log(type, "kkkk")
  try {
    if(!type){
      res.status(500).json({message:"type is a required field"})
    }
      const totalOrder = await Content.find({type, status:9}).countDocuments()
      console.log(totalOrder)
      const result = await Content.create({type,content,point,header,footer, order:totalOrder+1})
      console.log(result)        
      res.status(200).json({result:content, message:"content fetched successfully"})
    } catch (error:any) {
      res.status(500).json({message:"couldn't fetch content details"+error.message})
    }
}

export const updateContent = async(req:Request, res:Response) => {
    const {type,id,content="", point=[], header="", footer=""} = req.body


    try {
        if(!id){
          res.status(500).json({message:"id is a required field"})
        }
        if(!type){
          res.status(500).json({message:"type is a required field"})
        }

        const contentDoc = await Content.findById({id})
        if(!contentDoc){
          res.status(500).json({message:"don't have doc for this id. please check id"})
        }       

        // const totalCount = await User.countDocuments()      
        res.status(200).json({result:content, message:"content fetched successfully"})
      } catch (error:any) {
        res.status(500).json({message:"couldn't fetch contnet details"+error.message})
      }
}

export const deleteContent = async(req:Request, res:Response) => {
    const {id} = req.body
    try {
        const content = await Content.find({id})
        // const totalCount = await User.countDocuments()      
        res.status(200).json({result:content, message:"content fetched successfully"})
      } catch (error:any) {
        res.status(500).json({message:"couldn't fetch contnet details"+error.message})
      }
}

export const updateOrder = async(req:Request, res:Response) => {
  const {type,id,order} = req.body
  

  try {
      if(!id){
        res.status(500).json({message:"id is a required field"})
      }
      if(!type){
        res.status(500).json({message:"type is a required field"})
      }
      if(!order){
        res.status(500).json({message:"type is a required field"})
      }

      const contentDoc:any = await Content.findById(id)
      console.log(contentDoc, contentDoc.order)
      if(!contentDoc){
        res.status(500).json({message:"don't have doc for this id. please check id"})
      }       
      const totalOrder = await Content.find({type,status:9}).countDocuments()
      const currentOrder = contentDoc.order
      
      if(order>totalOrder){
        res.status(500).json({message:"order out of range"})
      }
      if(order<1){
        res.status(500).json({message:"order number in invalid"})
      }

      console.log(currentOrder, totalOrder)
      if(order>currentOrder && order<totalOrder){
        await Content.updateMany({type:contentDoc?.type, status:9, order:{$gt:currentOrder, $lte:order}},
          {$inc:{order:-1}, updated_at:DateTime.now().toUTC().toISO()},)
          res.status(200).json({message:"content fetched successfully"})
        }
      else if(order<currentOrder && order<totalOrder){
        await Content.updateMany({type:contentDoc?.type, status:9, order:{$lt:currentOrder, $gte:order}})
        res.status(200).json({message:"content fetched successfully"})
      }
      else{
        res.status(200).json({message:"order is not matched"})
      }
     
      
    } catch (error:any) {
      res.status(500).json({message:"couldn't fetch contnet details"+error.message})
    }
}