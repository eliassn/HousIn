import {Router} from 'express'
import { register,login, refreshToken, logout, verifyToken } from '../controllers/Auth'
import dotenv from 'dotenv'
import AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import multer from 'multer'

dotenv.config()

var s3 : any = new AWS.S3({
    accessKeyId:process.env.S3KEY,
    secretAccessKey:process.env.SECRET_S3_KEY,
    region:process.env.S3REGION,

    
})

 const uploadS3 = (bucketName:string)=>
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

export const router = Router()
router.post('/register',uploadS3("chelbi-housin").array('picture'),register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/refresh',refreshToken)