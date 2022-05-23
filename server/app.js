import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {Sequelize} from 'sequelize'

const config={
    host:"localhost",
    port:5432,
    dialect:"postgres",
    
}
const DB_USER = "Houser"
const DB_PASS="1@#k!ngl0S"
const DB_NAME="REP"

const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASS,config)
//set env
dotenv.config()

const main = () =>{
const app = express()
const port = process.env.PORT || 4000
//starting server
app.listen(port,()=>{
    try {
        console.log(`server up and running on port ${port}`)
    } catch (error) {
        console.error(error)
    }
})
//cors 
app.use(cors())

/////
app.use(express.json())

//middlewares




}




main()