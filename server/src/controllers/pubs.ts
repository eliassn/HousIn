import {Request,Response,NextFunction} from 'express'
import myAppDtataSource from '../db-config/db'
import multer from 'multer'
import { Pubs } from '../entities/Publishings'
import { User } from '../entities/User'
import path from 'path'

import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import { findUserFirstName, findUserLastName } from '../helpers/helpers'


dotenv.config()

var s3 : any = new AWS.S3({
    accessKeyId:process.env.S3KEY,
    secretAccessKey:process.env.SECRET_S3_KEY,
    region:process.env.S3REGION,

    
})

export const uploadS3 = (bucketName:string)=>
    multer({
        storage:multerS3({
            s3,
            bucket:bucketName,
            metadata:function(req,file,cb){
                cb(null,{fieldName:file.fieldname})
            },
            key:function(req,file,cb){
                cb(null,`${Date.now()}--${file.originalname}`)
            },
            acl:"public-read"
    
        })
       })
       const uploadImages= uploadS3("chelbi-housin").array("photos")   
export const createPub = async (req:Request,res:Response,next:NextFunction) =>{

    
var pubs : any  = new Pubs()
var files:any = req.files 
if(files.length > 0){
    pubs.photos = files.map((file: any)=>{
        return file.location
    })
}
// pubs.firstName = findUserFirstName(Number(req.params.user_id))
// pubs.lastName = findUserLastName(Number(req.params.user_id))
    
    pubs.price = req.body.price
    pubs.type = req.body.type
    pubs.place = req.body.place
    pubs.state = req.body.state
    pubs.description = req.body.description
    pubs.tel = req.body.tel
    pubs.likes = []
    pubs.userId = req.params.user_id
    // var userRepo = myAppDtataSource.getRepository(User)
    //   var found = await userRepo.findOneById({uid:pubs.userId})
    //   pubs.firstName = found.firstName
    //   pubs.lastName = found.lastName
   
    
    try {
        
          
        const savedPub = await myAppDtataSource.manager.save(pubs)
        console.log(savedPub.photoPreview)
        if(savedPub) res.status(200).json({savedPub,files:req.files})
        console.log(req.body,req.files)
    } catch (error) {
        res.json(error)
    }


}
// export  function testUploadImgWithMulter(req:Request,res:Response){
// const uploadImages= uploadS3("chelbi-housin").array("photos")
// uploadImages(req,res,err=>{
// if(err) return res.status(400).json(err.message)
// console.log(req.files)
// res.status(200).json({data:req.files})
// })

// }
export async function getLikesByPbId(req:Request,res:Response){
    var pid = req.body.id
    var pubrepo = myAppDtataSource.getRepository(Pubs)
    var pubById = await pubrepo.findOneBy({id:pid})
    try {
        res.status(200).json(pubById?.likes.length)
    } catch (error) {
        res.status(400).json(error)
    }
   
}

export async function handleLikes(req:Request,res:Response){

  var id = Number(req.params.user_id)
  var pubRepository = myAppDtataSource.getRepository(Pubs)
  var foundPub = await pubRepository.findOneBy({id:req.body.id})

try {
    var likes  = foundPub!.likes
    
        likes.push(id)
       
 
        
    var savedPub = await myAppDtataSource.manager.save(foundPub)
        res.status(200).json(likes)
      
   
} catch (error:any) {
    res.status(400).json(error.message)
}  

 
}
export async function handleDisLikes(req:Request,res:Response){

    var id = Number(req.params.user_id)
    var pubRepository = myAppDtataSource.getRepository(Pubs)
    var foundPub = await pubRepository.findOneBy({id:req.body.id})
  
  try {
      var likes  = foundPub!.likes
      
          likes.splice(likes.indexOf(id),1)
         
   
          
      var savedPub = await myAppDtataSource.manager.save(foundPub)
          res.status(200).json(likes)
        
     
  } catch (error:any) {
      res.status(400).json(error.message)
  }  
  
   
  }
export async function deletePub(req:Request,res:Response){

    var id = Number(req.params.user_id)
    var pubRepository = myAppDtataSource.getRepository(Pubs)
    var foundPub = await pubRepository.findOneBy({id:req.body.id})
  
  try {
     
   
          
      var savedPub = await myAppDtataSource.manager.remove(foundPub)
          res.status(200).json(savedPub)
        
     
  } catch (error:any) {
      res.status(400).json(error.message)
  }
  
  
}  