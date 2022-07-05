import { NextFunction, Request, Response } from "express";
import myAppDtataSource from "../db-config/db";
import { User } from "../entities/User";
import { Pubs } from "../entities/Publishings";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


       export  async function register (req:Request,res:Response){
        const salt = await bcryptjs.genSalt(8);
        var hashedPassword = await bcryptjs.hash(req.body.password,salt)
        const user : any = new User()
        var files:any = req.files 
if(files.length > 0){
    user.picture = files.map((file: any)=>{
        return file.location
    })
}
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.phone = req.body.phone
        user.email = req.body.email
        user.password = hashedPassword
        user.job = req.body.job
        user.nationality = req.body.nationality
        user.isCompany = req.body.isCompany
        
        const token = jwt.sign(
          { user_id: user.uid, email:user.email },
          process.env.TOKEN_KEY as string,
          {
            expiresIn: "2h",
          }
        );
        user.token = token
        
         
        const emailExist = await myAppDtataSource.getRepository(User).findOneBy({email:req.body.email})
        if(emailExist){
            res.json('un compte existe deja avec cet email  voir login')
            return
        }
      try {
         const savedUser = await myAppDtataSource.manager.save(user)
         res.status(200).json({id:savedUser.uid,token:savedUser.token})
      } catch (error) {
          res.status(400).json(error)
      }
    }

   export async function login (req:Request,res:Response){
    
    const foundUser = await myAppDtataSource.getRepository(User).findOneBy({email:req.body.email})
    if(!foundUser) return res.status(404).json("email ou mot de passe non valide essayer de cree un compte")
    var validPass = await bcryptjs.compare(req.body.password,foundUser.password)
    console.log(validPass)
    if(!validPass) return res.status(404).json("email ou mot de passe non valide essayer de cree un compte")
    const token = generateAccessToken(foundUser)
    foundUser.token = token
    const refreshToken = generateRefreshToken(foundUser)
     foundUser.refreshToken = refreshToken
        refreshTokens.push(refreshToken)
      res.status(200).json(foundUser)
      
   }
   /////////////////////
   export async function logout(req:Request,res:Response){
   const refreshToken = req.body.token
   refreshTokens = refreshTokens.filter(token=>token !== refreshToken)
   res.status(200).json('you are logged out')
   

   }


   function generateAccessToken(user:any){
   return jwt.sign(
      { user_id: user.uid, email:user.email },
      process.env.TOKEN_KEY as string,
      {
        expiresIn: "2h",
      }
    );
   }
   function generateRefreshToken(user:any){
    return jwt.sign(
      { user_id: user.uid, email:user.email },
      process.env.REFRESH_KEY as string,
      {
        expiresIn: "2h",
      }
    );
   }
   export function verifyToken(req:Request,res:Response,next:NextFunction){
   var config = process.env
   const token = req.body.token || req.query.token || req.headers["x-access-token"]
   if(!token){
    return res.status(403).send("A token is required for authentication")
   }
   try {
    const decoded : any = jwt.verify(token,config.TOKEN_KEY as string)
    req = decoded
   } catch (error) {
    return res.status(401).send("Invalid Token")
   }
   return next()
   }

   ////////////////////////////
   var refreshTokens : any[] = []
   export function refreshToken(req:Request,res:Response){
    const refreshToken = req.body.token
    if(!refreshToken) return res.status(401).json('you are not authenticated')
    if(!refreshTokens.includes(refreshToken)){
     return res.status(403).json('refreshToken not valid')
    }
    jwt.verify(refreshToken,process.env.REFRESH_KEY as string,(err:any,user:any)=>{
    err && console.log(err)
    refreshTokens = refreshTokens.filter((token)=>token !== refreshToken)
    const newAccessToken = generateAccessToken(user)
    const newRefreshToken = generateRefreshToken(user)
    refreshTokens.push(newRefreshToken)
    res.status(200).json({
      token:newAccessToken,
      refreshToken:newRefreshToken
    })
    })
   }
