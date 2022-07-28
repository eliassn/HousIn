import {Router} from 'express'
import { addMessage, getMessagesByConversationId } from '../controllers/messages'

const messageRouter = Router()
messageRouter.post('/:user_id/message',addMessage)
messageRouter.get('/allmessages',getMessagesByConversationId)

export default messageRouter