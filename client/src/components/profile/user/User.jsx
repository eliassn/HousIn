import React from 'react'
import { UserData } from '../../../UserMockData'
import {Search, ThumbUp,ChatBubble, Star, Person, Work} from '@mui/icons-material'
import { Card,Box, CardActionArea, CardActions,Button, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'
import UserCard from '../../userCard/UserCard'
import Sidebar from '../../../sidebar/Sidebar'
import RightBar from '../../rightBar/RightBar'

  
const User = () => {
 
  

   
  return (
    <div className='user'>
      <div  className='sidebar'>

    <Sidebar/>
      </div>
   <div className="container"><UserCard/></div>
   <div className="right"><RightBar/></div>
    </div>
  )
}

export default User