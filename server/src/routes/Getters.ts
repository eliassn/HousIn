import { all, getAllPubs, getPubsByLocation, getPubsByUserId, getUserById } from "../controllers/Getters";
import {Router} from 'express'

export const getters = Router()
getters.get('/allUsers',all)
getters.get('/allPubs',getAllPubs)
getters.get('/:user_id',getUserById)
getters.get('/',getPubsByLocation)
getters.get('/:user_id/user',getPubsByUserId)
