import {Request,Response} from 'express'
import myAppDtataSource from '../db-config/db'
import { Pubs } from '../entities/Publishings'
import { User } from '../entities/User'


export const createPub = async (req:Request,res:Response) =>{

var pubs : any = new Pubs()
    pubs.place = req.body.place
    pubs.photos = req.files
    pubs.price = req.body.price
    pubs.tel = req.body.tel
    pubs.type = req.body.type
    pubs.description = req.body.description
    pubs.userId = req.params.user_id
    

    try {
        
        const savedPub = await myAppDtataSource.manager.save(pubs)
        console.log(savedPub.photos)
        if(savedPub) res.status(200).json(savedPub)
    } catch (error) {
        res.json(error)
    }


}