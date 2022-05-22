import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {DataSource} from 'typeorm'
import authRouter from './routes/auth'
import 'reflect-metadata'
import {User} from './models/user'
dotenv.config()


export const MyAppDataSource = new DataSource({
    "type": "postgres",
    "host": process.env.HOST,
    "port": Number(process.env.DBPORT),
    "username": process.env.NAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "synchronize": true,
   "logging": false,
   "entities": [
    "src/models/*.ts"],
})
const main = () =>{
const app = express()
const port = Number(process.env.PORT) || 9000
 
//app
app.listen(port,()=>{
    try {
        console.log(`app listening on port ${port}`)
    } catch (error) {
        console.error(error)
    }
})
app.use(cors())
app.use(express.json())
//middlewares

app.use(authRouter)


}





main()