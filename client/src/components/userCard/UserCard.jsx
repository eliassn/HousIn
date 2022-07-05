import React,{useState,useEffect} from 'react'
// import { UserData } from '../../UserMockData'
import {MyLocation,Search, ThumbUp,ChatBubble, Star, Person, Work, DeleteOutlined, ChatBubbleOutlined, ThumbUpOutlined, ChatBubbleOutline, PersonOutlined, StarOutlined, StarOutlineRounded, ArrowRightAltOutlined, PhoneOutlined} from '@mui/icons-material'
import { Card,Box,Slider, CardActionArea, CardActions,Button, CardContent, CardHeader, Typography, CardMedia } from '@mui/material'
import { getAllInTimeLine } from '../api/getters'
import Photogrid from "react-facebook-photo-grid";
import axios from 'axios'
import ImageCarrousel from '../ImageCarrousel'
import Ads from '../../Ads'
import {Link} from 'react-router-dom'

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
    var res = await axios.get(newUrl,{
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
  
function tokenExpired(tok) {
  const expiry = (JSON.parse(atob(tok.split('.')[1]))).exp;
  return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}
var token = localStorage.getItem('token')
 const tokenExpiration = async()=>{
  var url = "http://localhost:9000/logout"
  if(tokenExpired(token)){
    var body={token}
    const res = await axios.post(url,body)
    window.location.replace('http://localhost:3000')
  }
 }
  function handleContactRedirection (e){
    e.preventDefault()
    var receiverId = localStorage.setItem('receiver',pub.userId)
    window.location.replace(`http://localhost:3000/${userId}/inbox`)

  }
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
 
let res =  await axios.delete('http://localhost:9000/'+trimmedPath+'/delete',{
   
id:pub.id,
headers:{
      "Content-Type":"application/json",
      "x-access-token":token
    }
  })
  console.log(res.data)
  window.location.replace('http://localhost:3000/'+trimmedPath+"/user")
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
 
console.log(localStorage.getItem('likes'))
  return <Box  key={pub.id} width='700px' className="card" >
  {/* <head>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3975801670345264"
     crossorigin="anonymous"></script>
  </head> */}
 { console.log(pub.user_first_name)}
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
       <PersonOutlined className='personIcon'/> {pub.user_first_name+' '+pub.user_last_name}
      </Typography>
      <Typography gutterBottom variant="h5" component='div' className='personDiv'>
       <PhoneOutlined className='personIcon'/> {pub.tel}
      </Typography>
      <div className='body2' >
      <ul className='cardList'>


    
        <li key={pub.id}>Price <ArrowRightAltOutlined/> {`${pub.price} TND`}</li>
        <li>Type <ArrowRightAltOutlined/> {pub.type}</li>
        <li>Country <ArrowRightAltOutlined/> {pub.place}</li>
        <li>state  <ArrowRightAltOutlined/>{pub.state}</li>
        <p>
          <Typography gutterBottom variant='h5'>Description</Typography>
       {pub.description}
        </p>
      </ul>
        
      </div>
    </CardContent>
    <CardActions className='cardActions'>
     {pub.likes.includes(Number(userId))||pub.likes.includes(userId)?<Button size='small' id='like' className='btn' ><ThumbUp/>{pub.likes.length} </Button>:<Button size='small' id='like' className='btn' onClick={handleLikes}><ThumbUpOutlined/>{pub.likes.length}</Button>}
      {path==="timeline"?<Button size='small' className='btn' onClick={handleContactRedirection}><ChatBubbleOutline className='icon2'/><span>Contact</span></Button>
      :<Button size='small' className='btn' onClick={(e)=>{handleDelete(e)}}><DeleteOutlined className='icon3'/><span>Delete</span></Button>}
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