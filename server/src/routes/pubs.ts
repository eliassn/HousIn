import { Router } from "express";
import { createPub } from "../controllers/pubs";
import multer from 'multer'

const fileStorageEngine = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'../images')
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
    }
})

const upload = multer({storage:fileStorageEngine})


var pubRouter = Router()

pubRouter.post('/:user_id/user',upload.array('photos'),createPub)




export default pubRouter