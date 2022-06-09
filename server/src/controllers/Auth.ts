import { Request, Response } from "express";
import myAppDtataSource from "../db-config/db";
import { User } from "../entities/User";
import { Pubs } from "../entities/Publishings";
import bcryptjs from 'bcryptjs'


       export  async function register (req:Request,res:Response){
        const salt = await bcryptjs.genSalt(8);
        var hashedPassword = await bcryptjs.hash(req.body.password,salt)
        const user = new User()
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.phone = req.body.phone
        user.email = req.body.email
        user.password = hashedPassword
        user.job = req.body.job
        user.isCompany = req.body.isCompany
        
         
        const emailExist = await myAppDtataSource.getRepository(User).findOneBy({email:req.body.email})
        if(emailExist){
            res.json('un compte existe deja avec cet email  voir login')
            return
        }
      try {
         const savedUser = await myAppDtataSource.manager.save(user)
         res.status(200).json(savedUser.uid)
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
       
        
      res.status(200).json(foundUser.uid)
      
   }
