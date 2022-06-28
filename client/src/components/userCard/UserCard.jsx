import React,{useState,useEffect} from 'react'
// import { UserData } from '../../UserMockData'
import {MyLocation,Search, ThumbUp,ChatBubble, Star, Person, Work, DeleteOutlined, ChatBubbleOutlined, ThumbUpOutlined, ChatBubbleOutline, PersonOutlined, StarOutlined, StarOutlineRounded, ArrowRightAltOutlined, PhoneOutlined} from '@mui/icons-material'
import { Card,Box,Slider, CardActionArea, CardActions,Button, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'
import { getAllInTimeLine } from '../api/getters'
import Photogrid from "react-facebook-photo-grid";
import axios from 'axios'
import ImageCarrousel from '../ImageCarrousel'
import Ads from '../../Ads'

var userId = localStorage.getItem('userId')
const UserCard = () => {
var path = window.location.pathname.split('/')[1]  
 
const [pubData,setPubData] = useState([])

const [userData,setUserData] = useState([])
const [likesCount,setLikesCount] = useState(null)

// const [like,setLike] = useState([])
useEffect(()=>{
  
  async function fetchDataPubs(){
    var path = window.location.pathname.split('/')
     
    var trimmedPath = path[1]
    const token = localStorage.getItem('token')
   if(typeof(Number(trimmedPath))==="number"){
    var newUrl = `http://localhost:9000/${trimmedPath}`
    res = await axios.get(newUrl,{
     headers:{
       "x-access-token":token
     }})
     console.log(res.data)
   setUserData(res.data)
   }

  if((trimmedPath==="timeline")){

    var res = await axios.get("http://localhost:9000/allPubs",{
      headers:{
        "x-access-token":token
      }
    })
    var pubs =  JSON.stringify(res.data[0][0])
     
     return setPubData(res.data[0])

  }
 
 res = await axios.get(`http://localhost:9000/${trimmedPath}/user`,{
  headers:{
    "x-access-token":token
  }
})

console.log(res.data)
setPubData(res.data)

  }
 
  fetchDataPubs()
  
  // fetchUser()
},[])


const usePubs = pubData.map((pub)=>{ 
  
  

  
  
//  
const handleDelete = async(e)=>{
  e.preventDefault()
  var path = window.location.pathname.split('/')
   var token = localStorage.getItem('token')
   console.log(token)
  var trimmedPath = path[1]
  const userId = localStorage.getItem('userId')
//  var config = {
//   headers:{
//     "Content-Type":"application/json",
//     "x-access-token":token
//   }
//  }
 
  var data = {
    id:pub.id
  }
  console.log(data)
  // document.getElementById('like').style.color = "blue"
 
  await axios.delete('http://localhost:9000/'+trimmedPath+'/delete',data,{
    headers:{
      "x-access-token":token
    }
  })
  window.location.replace('http://localhost:3000/'+trimmedPath+"/user")
}
const handleDisLikes = async(e)=>{
  e.preventDefault()
  var path = window.location.pathname.split('/')
 
  var trimmedPath = path[1]
  const userId = localStorage.getItem('userId')
 
 
  var data = {
    id:pub.id
  }
  console.log(data)
  // document.getElementById('like').style.color = "blue"
 
  var res = await axios.put('http://localhost:9000/'+userId+'/dislikes',data)
  console.log(res.data.length)
  setLikesCount(res.data.length)
 console.log(localStorage.setItem('likes',res.data.length))
 result = localStorage.getItem('likes')
   console.log(localStorage.getItem('likes'))
  return localStorage.getItem('likes')
}
var result = localStorage.getItem('likes')
  const handleLikes = async(e)=>{
    e.preventDefault()
    var path = window.location.pathname.split('/')
   
    var trimmedPath = path[1]
    const userId = localStorage.getItem('userId')
   
   
    var data = {
      id:pub.id
    }
    console.log(data)
    // document.getElementById('like').style.color = "blue"
   
    var res = await axios.put('http://localhost:9000/'+userId+'/likes',data)
    console.log(res.data.length)
    setLikesCount(res.data.length)
   console.log(localStorage.setItem('likes',res.data.length))
   result = localStorage.getItem('likes')
     console.log(localStorage.getItem('likes'))
     pub.likes = res.data
     console.log(pub.likes)
     pub.likes.length = res.data.length
    return localStorage.getItem('likes')
  }
  console.log(result)
console.log(localStorage.getItem('likes'))
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
       <PersonOutlined className='personIcon'/> {userData.firstName+' '+userData.lastName}
      </Typography>
      <Typography gutterBottom variant="h5" component='div' className='personDiv'>
       <PhoneOutlined className='personIcon'/> {pub.tel}
      </Typography>
      <div className='body2' >
      <ul className='cardList'>


    
        <li key={pub.id}>Prix <ArrowRightAltOutlined/> {`${pub.price} TND`}</li>
        <li>Type <ArrowRightAltOutlined/> {pub.type}</li>
        <li>Gouvernorat <ArrowRightAltOutlined/> {pub.place}</li>
        <li> <span>Cité  <ArrowRightAltOutlined/> </span></li>
        <p>
          <Typography gutterBottom variant='h5'>Déscription</Typography>
       {pub.description}
        </p>
      </ul>
        
      </div>
    </CardContent>
    <CardActions className='cardActions'>
     {pub.likes.includes(Number(userId))||pub.likes.includes(userId)?<Button size='small' id='like' className='btn' ><ThumbUp/>{pub.likes.length}</Button>:<Button size='small' id='like' className='btn' onClick={handleLikes}><ThumbUpOutlined/>{pub.likes.length}</Button>}
      {path==="timeline"?<Button size='small' className='btn'><ChatBubbleOutline className='icon2'/><span>Contacter</span></Button>
      :<Button size='small' className='btn' onClick={handleDelete}><DeleteOutlined className='icon3'/><span>Supprimer</span></Button>}
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