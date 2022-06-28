import { Router } from "express";
import { createPub, deletePub, getLikesByPbId, handleDisLikes, handleLikes } from "../controllers/pubs";
import { verifyToken } from "../controllers/Auth";
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

pubRouter.post('/:user_id/user',uploadS3("chelbi-housin").array('photos'),verifyToken,createPub)


pubRouter.put('/:user_id/likes',handleLikes)
pubRouter.put('/:user_id/dislikes',handleDisLikes)
// pubRouter.get('/likes',getLikesByPbId)
pubRouter.delete('/:user_id/delete',deletePub)

export default pubRouter