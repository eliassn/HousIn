import { all, getAllPubs, getPubsByLocation, getPubsByUserId, getUserById } from "../controllers/Getters";
import {Router} from 'express'
import { verifyToken } from "../controllers/Auth";

export const getters = Router()
getters.get('/allUsers',verifyToken,all)
getters.get('/allPubs',verifyToken,getAllPubs)
getters.get('/:user_id',verifyToken,getUserById)
getters.get('/',verifyToken,getPubsByLocation)
getters.get('/:user_id/user',verifyToken,getPubsByUserId)
