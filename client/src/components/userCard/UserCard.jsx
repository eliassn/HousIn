import React from 'react'
import { UserData } from '../../UserMockData'
import {MyLocation,Search, ThumbUp,ChatBubble, Star, Person, Work, DeleteOutlined, ChatBubbleOutlined, ThumbUpOutlined, ChatBubbleOutline} from '@mui/icons-material'
import { Card,Box, CardActionArea, CardActions,Button, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'

const UserCard = () => {
  var identifiers = ['star1','star2','star3','star4','star5']
  var stars = {
    'star1': function(){
      document.getElementById(identifiers[0]).style.color = "#B20600"
    },
    'star2':function(){
      document.getElementById(identifiers[1]).style.color = "#B20600"
    },
    'star3': function(){
      document.getElementById(identifiers[2]).style.color = "#B20600"
    },
    'star4': function(){
      document.getElementById(identifiers[3]).style.color = "#B20600"
    },
    'star5': function(){
      document.getElementById(identifiers[4]).style.color = "#B20600"
    },
  }

  return (
    <>
    
<div className="middle">

<Box width='700px' className="card">
  <Card className='muiCard'>
    <CardMedia 
    component='img'
    height='140'
    image='https://images.pexels.com/photos/7015865/pexels-photo-7015865.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
    />
    <CardContent className='cardContent'>
      <div>
        <Star id='star1' onClick={stars.star1} />
        <Star id='star2' onClick={ stars.star2}  />
        <Star id='star3' onClick={ stars.star3}  />
        <Star id='star4' onClick={stars.star4}  />
        <Star id='star5' onClick={ stars.star5} />
        
      </div>
      <Typography gutterBottom variant="h5" component='div'>
       <Person/> {UserData.fullName}
      </Typography>
      <div className='body2' >
      <ul>



        <li>Prix : 350dt</li>
        <li>Type : s + 3</li>
        <li>Gouvernorat : {UserData.location}</li>
        <li><MyLocation/> <span> : El fahs</span></li>
      </ul>
        
      </div>
    </CardContent>
    <CardActions className='cardActions'>
      <Button size='small' className='btn'><ThumbUpOutlined className='icon'/><span>3</span></Button>
      <Button size='small' className='btn'><ChatBubbleOutline className='icon'/><span>Contacter</span></Button>
      <Button size='small' className='btn'><DeleteOutlined className='icon'/><span>Supprimer</span></Button>
    </CardActions>
      
    
  </Card>
</Box>
</div>

</>
  )
}

export default UserCard