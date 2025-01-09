import mongoose, { Document } from "mongoose";
interface DocumentResult<T> {
    _doc: T;
}
export interface User extends DocumentResult<User>, Document {
    name: string,
    email: string,
    password: string,    
    created_at: string,
    updated_at: string,
    status:number,  
    user_type_id:number,
    token:String,
    isLoggedIn :Boolean,
    timezone:String
}

export interface StatusType extends DocumentResult<StatusType>, Document {
    status_type_id:Number,
    status_type: string,
    created_at:string,
    updated_at:string
}

export interface ContentType extends DocumentResult<ContentType>, Document {    
    type:Number,
    title:string,
    header:string,
    footer:string,
    points:{
        point: string,
        status: number,
    }[],
    content:string,
    status:number ,
    order:number,
    created_at:string,
    updated_at:string,
}
export interface ContentPointType extends DocumentResult<ContentPointType>, Document { 
    type_id:Number
    type: string,
    created_at:string,
    updated_at:string
}

export interface NotificationTokenType extends DocumentResult<NotificationTokenType>, Document{
    user_id:string,
    token:string,
    created_at:string,
    updated_at:string,
}