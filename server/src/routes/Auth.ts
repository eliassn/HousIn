import {Router} from 'express'
import { register,login } from '../controllers/Auth'


export const router = Router()
router.post('/register',register)
router.post('/login',login)