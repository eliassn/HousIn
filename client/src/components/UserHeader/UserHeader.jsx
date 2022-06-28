import React from 'react'
import {ChatBubble, AccountBox, AccountBoxOutlined, ChatBubbleOutline, HomeRounded, HomeOutlined, LogoutOutlined} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { loginActions } from '../../redux/loginSlice'
import { useState } from 'react'
const UserHeader = () => {
  const userId = localStorage.getItem('userId')
  console.log(userId)
  var dispatch  = useDispatch()
  var url = "http://localhost:3000/logout"
  var clearToken = async () =>{
    var token = localStorage.getItem('token')
    try {
      var config = {
        "Content-Type":"application/json"
      }
      var body = {token}
      const res = await axios.post(url,JSON.stringify(body))
      dispatch(loginActions.logout())
    } catch (error) {
      localStorage.removeItem('token')
     
    }
  }
  return (
    <>
    <header className='header'>
        <div>
            <Link className='links' to="/timeline"><HomeOutlined className='sideIcons'/></Link>
        </div>
        <nav className="navbar">
            <ul>
                <Link className='links' to="/inbox"><ChatBubbleOutline className='sideIcons'/> <span>2</span></Link>
                <Link className='links' to={"/"+userId+"/user"}><AccountBoxOutlined className='sideIcons'/>
                 {/* <p>Profile</p> */}
                </Link>
                <Link className='links' to="/" onClick={clearToken}><LogoutOutlined className='sideIcons'/></Link>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default UserHeader