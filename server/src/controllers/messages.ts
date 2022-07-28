import {Message} from '../entities/message'
import { Request,Response } from 'express'
import myAppDtataSource from '../db-config/db'



export async function addMessage(req:Request,res:Response){
const message = new Message()
message.text = req.body.text
message.sender = req.params.user_id
message.conversationId = req.body.conversationId
try {
    const savedMessage = await myAppDtataSource.manager.save(message)
    res.status(200).json(savedMessage)
} catch (error) {
    res.json(error)
}
}

export async function getMessagesByConversationId(req:Request,res:Response){
    
   
   var messageRepo = myAppDtataSource.getRepository(Message)
   var messasges = await messageRepo.find()
   res.status(200).json(messasges)
  
}