import React,{useState,useEffect} from 'react'
import { UserData } from '../../UserMockData'
import {MyLocation,Search, ThumbUp,ChatBubble, Star, Person, Work, DeleteOutlined, ChatBubbleOutlined, ThumbUpOutlined, ChatBubbleOutline, PersonOutlined, StarOutlined, StarOutlineRounded, ArrowRightAltOutlined} from '@mui/icons-material'
import { Card,Box,Slider, CardActionArea, CardActions,Button, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'
import { getAllInTimeLine } from '../api/getters'
import Photogrid from "react-facebook-photo-grid";
import axios from 'axios'
import ImageCarrousel from '../ImageCarrousel'
import Ads from '../../Ads'


const UserCard = () => {
  
 
const [pubData,setPubData] = useState([])
const [images,setImages] = useState([])

useEffect(()=>{
  async function fetchDataPubs(){
    var path = window.location.pathname.split('/')
   
    var trimmedPath = path[1]
   
  if((trimmedPath==="timeline")){

    var res = await axios.get("http://localhost:9000/allPubs")
    var pubs =  JSON.stringify(res.data[0][0])
     
     return setPubData(res.data[0])

  }
 res = await axios.get(`http://localhost:9000/${trimmedPath}/user`,{
  headers:{
    
  }
})

console.log(res.data)
setPubData(res.data)

  }
  fetchDataPubs()
},[])

const usePubs = pubData.map((pub)=>{ 
  
  return <Box  key={pub.id} width='700px' className="card" >
  {/* <head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3975801670345264"
     crossorigin="anonymous"></script>
  </head> */}
  <Card 
  sx={{ borderRadius: '16px',border:'20px solid white' }}
  className='muiCard'>
  {/* */}
  {/* <img src={pub.photos} style={{width:'200px',height:'200px'}} /> */}
  <Photogrid 
  width='100%'
  height='100%'
  images={pub.photos}>
      
      </Photogrid>
    <CardContent className='cardContent'>
     
      <Typography gutterBottom variant="h5" component='div' className='personDiv'>
       <PersonOutlined className='personIcon'/> {UserData.fullName}
      </Typography>
      <div className='body2' >
      <ul className='cardList'>


    
        <li key={pub.id}>Prix <ArrowRightAltOutlined/> {`${pub.price} TND`}</li>
        <li>Type <ArrowRightAltOutlined/> {pub.type}</li>
        <li>Gouvernorat <ArrowRightAltOutlined/> {pub.place}</li>
        <li> <span>Cité  <ArrowRightAltOutlined/> </span></li>
        <p>
          <Typography gutterBottom variant='h5'>Description</Typography>
       {pub.description}
        </p>
      </ul>
        
      </div>
    </CardContent>
    <CardActions className='cardActions'>
      <Button size='small' className='btn'><ThumbUpOutlined className='icon1'/><span>3</span></Button>
      <Button size='small' className='btn'><ChatBubbleOutline className='icon2'/><span>Contacter</span></Button>
      <Button size='small' className='btn'><DeleteOutlined className='icon3'/><span>Supprimer</span></Button>
    </CardActions>
      
    
  </Card>
</Box>
  
})

  

  return (
    <>
    
<div className="middle">

{usePubs}
  

</div>

</>
  )
}

export default UserCard