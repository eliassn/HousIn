import React from 'react'
import {uid} from 'uid'
import './messages.scss'
import {io} from 'socket.io-client'
import Conversations from '../conversations/Conversations'
import Message from '../message/Message'
var socket =  io('http://localhost:5000')
const Messages = () => {


  return(
    <>
<div className='messenger'>
<div className="chatMenu">
  <div className="chatMenuWrapper">
    <input type="text" placeholder='search users' className='chatMenuInput' />
  <Conversations/>
  <Conversations/>

  <Conversations/>

  <Conversations/>

  <Conversations/>

  </div>
</div>
<div className="chatBox">
  <div className="chatBoxWrapper">
    <div className="chatboxTop">
      <Message/>
      <Message own={true}/>

      <Message/>
      <Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
<Message own={true}/>

<Message/>
     
    </div>
    <div className="chatboxBottom">
      <textarea className='chatMessageInput' placeholder='write a message ...'></textarea>
      <button className="chatSubmitButton">Send</button>
    </div>

  </div>
</div>
<div className="chatOnline">
  <div className="onlineWrapper">
    online
  </div>
</div>
</div>
    </>
  )
}
 

export default Messages