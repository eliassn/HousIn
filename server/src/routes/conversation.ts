import { Router } from "express";
import { getConvById, newConversation } from "../controllers/converstation";

 var conversationRouter = Router()

conversationRouter.post('/conversation',newConversation)
conversationRouter.get('/:user_id/conversation',getConvById)


export default conversationRouter