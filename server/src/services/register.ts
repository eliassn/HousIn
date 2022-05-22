import { MyAppDataSource } from "..";
import { Request,Response } from "express";
import { User } from "../models/user";




export const register = async (req:Request,res:Response)=>{
try {
    var user = new User()
user.name = req.body.name
user.phone = req.body.phone
user.picture = req.body.picture
user.gender = req.body.gender
user.isCompany = req.body.isCompany
user.password = req.body.password
const savedUser = await MyAppDataSource.manager.save(user)
return res.status(200).json(savedUser)
} catch (error) {
    res.status(500).json({'Error':error})
}
}