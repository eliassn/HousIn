import myAppDtataSource from "../db-config/db"
import { Request,Response } from "express"
import { Pubs } from "../entities/Publishings"




export async function RemovePubById(req:Request,res:Response){
    var pubRepo = myAppDtataSource.getRepository(Pubs)
    
}