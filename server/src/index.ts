import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import myAppDataSource from './db-config/db'
import { router } from './routes/Auth'
import { getters } from './routes/Getters'
import { filters } from './routes/Filters'
import pubRouter from './routes/pubs'
import http from 'http'
import {Server} from 'socket.io'
import Os from 'os'
//starting http server

const app = express()
const port = process.env.PORT || 9000
const server = http.createServer(app)

//socket
export const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET","POST"]
  }
})
server.listen(port)
io.on('connection',(socket)=>{
  console.log("successfully connected")
 socket.emit("chat-message","hello world")
 socket.on("send-chat-message",(message,room,id,userId,receiverId)=>{
  console.log("client-message",message,room,id,userId,receiverId)
  socket.broadcast.to(receiverId).emit('receive-message',message)
 })
})

//wrapper function
function main(){
    dotenv.config()
    myAppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!","logicalCount: ",Os.cpus().length)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
    
app.use(cors())

app.use(express.json({
  limit:'50mb'
}))
app.use(express.urlencoded(
    {
  limit: '50mb',
  parameterLimit: 10000,
  extended: true 
    }
))

app.use(router)
app.use(getters)
app.use(pubRouter)



}





main()