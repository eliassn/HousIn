import { Router } from "express";
import { createPub, testUploadImgWithMulter } from "../controllers/pubs";
import multer from 'multer'
import path from 'path'
import { uploadS3 } from "../controllers/pubs";
 
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),"uploads"))
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'--'+file.originalname)
    }
})
const upload = multer({ storage })

var pubRouter = Router()

pubRouter.post('/:user_id/user',uploadS3("chelbi-housin").array('photos'),createPub)

pubRouter.post('/images',testUploadImgWithMulter)


export default pubRouter