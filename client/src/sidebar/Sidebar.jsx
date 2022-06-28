import React,{useState,useEffect} from 'react'
import './sidebar.scss'
import {Person,Email,Work,LocationOn, PersonOutlined, EmailOutlined, LocationOnOutlined} from '@mui/icons-material'
import { UserData } from '../UserMockData'
import axios from 'axios'
const Sidebar = () => {
  const [userData,setUserData] = useState([])
  useEffect(()=>{
  async function getUserInfos(){
    var path = window.location.pathname.split('/')
    var trimmedPath = path[1]
    var token = localStorage.getItem('token')
    var url = `http://localhost:9000/${trimmedPath}`
    try {
      var res = await axios.get(url,{
        headers:{
          "x-access-token":token
        }
      })
      console.log(res.data)
      setUserData(res.data)
    } catch (error) {
      console.error(error)
    }
  }
  getUserInfos()
  },[])
  var picture  = String(userData.picture).slice(2,-2)
  return (
    <div className='sidebarContent'>
        <div className="top"><span className="logo">
            HouseIn
            </span></div>
        <div className="center">
          <div className="profilePhoto">
            <span className="img">
            <img src={picture} alt="" />
            </span>
            <p><span>{UserData.profession}</span></p>
          </div>
            <ul>
            
                <li><PersonOutlined className='sideIcons'/><span>{userData.firstName+' '+userData.lastName}</span></li>
                <li><EmailOutlined className='sideIcons'/><span>{userData.email}</span></li>
                <li><LocationOnOutlined className='sideIcons'/><span>{userData.place}</span></li>
                
            </ul>
        </div>
        
    </div>
  )
}

export default Sidebar