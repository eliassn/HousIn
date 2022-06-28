import myAppDtataSource from "../db-config/db";
import { User } from "../entities/User";



export async function findUserFirstName(id:number){
var userRepo = myAppDtataSource.getRepository(User)
var userByid : any = await userRepo.findOneBy({uid:id})
try {
    return userByid.firstName
} catch (error) {
    // return "user not found"
    console.error(error)
}
}
export async function findUserLastName(id:number){
    var userRepo = myAppDtataSource.getRepository(User)
    var userByid : any = await userRepo.findOneBy({uid:id})
    try {
        return userByid.lastName
    } catch (error) {
        console.error(error)
    }
    }