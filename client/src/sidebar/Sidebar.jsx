import React from 'react'
import './sidebar.scss'
import {Person,Email,Work,LocationOn, PersonOutlined, EmailOutlined, LocationOnOutlined} from '@mui/icons-material'
import { UserData } from '../UserMockData'
const Sidebar = () => {
  return (
    <div className='sidebarContent'>
        <div className="top"><span className="logo">
            HouseIn
            </span></div>
        <div className="center">
          <div className="profilePhoto">
            <span className="img">
            <img src="https://images.pexels.com/photos/7015865/pexels-photo-7015865.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt="" />
            </span>
            <p><span>{UserData.profession}</span></p>
          </div>
            <ul>
            
                <li><PersonOutlined className='sideIcons'/><span>{UserData.fullName}</span></li>
                <li><EmailOutlined className='sideIcons'/><span>{UserData.email}</span></li>
                <li><LocationOnOutlined className='sideIcons'/><span>{UserData.location}</span></li>
                
            </ul>
        </div>
        
    </div>
  )
}

export default Sidebar