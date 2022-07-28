import { Server } from "socket.io";
import http from 'http'

var port = 5000
var httpServer = http.createServer()

var io = new Server(httpServer,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
io.listen(port)

io.on('connection',(socket)=>{
    console.log("connected and listening for socket events ....")
    socket.on('chat-message',(message)=>{
        console.log(message)
    })
})