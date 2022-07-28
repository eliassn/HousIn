import { Conversation } from "../entities/conversation";
import {Request,Response} from 'express'
import myAppDtataSource from "../db-config/db";


//newConv
export async function newConversation(req:Request,res:Response){

   var conversation = new Conversation()
   conversation.members = [req.body.senderId,req.body.receiverId]


    try {
        var savedConverstion = await myAppDtataSource.manager.save(conversation)
        res.status(200).json(savedConverstion)
    } catch (error) {
        res.json(error)
    }
}
export async function getConvById(req:Request,res:Response){
    var convId = Number(req.params.user_id)
   
    
    var convRepo  = myAppDtataSource.getRepository(Conversation)
   
    try {
      var conversations = await convRepo.find()
      var conversation =  conversations.filter(conversation=>{
       return conversation.members.includes(convId)
      })
      res.status(200).json(conversation)
    } catch (error) {
        res.json(error)
    }
}