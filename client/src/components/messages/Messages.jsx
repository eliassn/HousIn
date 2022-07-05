import React from 'react'
import {uid} from 'uid'
import {io} from 'socket.io-client'
var socket =  io('http://localhost:9000')
const Messages = () => {
  var roomId = uid(16)
  function displayMessage(textMessage){
  var display = document.createElement('p')
  display.innerText = textMessage
  console.log("text= ",textMessage)
  return  display.innerText
  }
  var messageInput = document.getElementById('messageInput')
 var messageingForm = document.getElementById('mForm')
  socket.on("chat-message",(data)=>{
    // console.log("socketData ",data)
  
  })
  messageingForm?.addEventListener("submit",(e)=>{
    e.preventDefault()
    var senderId = localStorage.getItem('userId')
    var receiverId = localStorage.getItem('receiver')
    const message = messageInput?.value
    var id = socket.id
    socket.emit("send-chat-message",message,roomId,id,senderId,receiverId)
    //console.log("my-message",message,id)
    var msg = "ok"
    const p = document.createElement('p')
    socket.on('receive-message',(Rmessage)=>{
    // msg = Rmessage
    
    p.innerHTML = `<span>${msg} </span>`
     
    })
   
    const me = document.getElementById('me')
    me?.appendChild(p)
  
    // messageInput.value=''
   
  })
  return (
    <div>
      <div id="me" className="me">
        <form id="mForm">
        <input id="messageInput" type="text"  style={{height:"100px",marginTop:"35px"}} />
        {/* <input id="room" type="hidden" value={roomId} /> */}
        <button type="submit" >send</button>
        </form>
      </div>
      <p className='my-message'></p>
      <div className="him"></div>
    </div>
  )
}

export default Messages