import myAppDtataSource from "../db-config/db"
import { Request,Response } from "express"
import { User } from "../entities/User"
import { Pubs } from "../entities/Publishings"


export async function all (req:Request,res:Response){
    try {
     const allUsers = await myAppDtataSource.manager.findAndCount(User)
     const usersCount = allUsers[1]
     res.status(200).json(allUsers)
    } catch (error) {
        res.json(error)
    }
 }
 export async function getUserById(req:Request,res:Response){
const userRepo = myAppDtataSource.getRepository(User)
try {
    const userById = await userRepo.findOneBy({
        email:req.body.email,
        uid:Number(req.params.user_id)
    })
    res.status(200).json(userById)
} catch (error) {
    res.json(error)
}


 }
 export async function getPubsByUserId(req:Request,res:Response){
     var pubsRepo = myAppDtataSource.getRepository(Pubs)
     var user_id : any  = req.params.user_id
     console.log(user_id)
     try {
       
         const pubsByUserId = await pubsRepo.findBy({userId:user_id})
         console.log("pbu",pubsByUserId)
         
         if(pubsByUserId) res.status(200).json(pubsByUserId)
         
         
        
     } catch (error) {
         res.json(error)
     }
 }
export async function getPubsByLocation(req:Request,res:Response){
    const pubsRepo = myAppDtataSource.getRepository(Pubs)
    var place = req.query.place
    try {
        const pubByLocation = await pubsRepo.findBy({place:place as string,price:req.query.price as string})
       if(pubByLocation) res.status(200).json(pubByLocation)
    } catch (error) {
        res.json(error)
    }
}


export async function getAllPubs(req:Request,res:Response){
try {
  const allPubs = await myAppDtataSource.manager.findAndCount(Pubs)
  if(allPubs) res.status(200).json(allPubs)
} catch (error) {
    res.json(error)
}

}
