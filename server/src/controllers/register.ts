import { register } from "../services/register";
import { Request,Response } from "express";


export const registerController= (req:Request,res:Response)=>{
    register(req,res)
}