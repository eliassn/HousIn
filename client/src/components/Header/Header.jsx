import React from 'react'
import {Link} from 'react-router-dom'
import { useSelector,useDispatch  } from 'react-redux'
import axios from 'axios'
import { loginActions } from '../../redux/loginSlice'
import {LogoutOutlined,HomeOutlined,ChatBubbleOutline,AccountBoxOutlined,} from '@mui/icons-material'
const Header = () => {
 
  var pathName = window.location.pathname.split('/')
  var path = pathName[1]
  console.log(path)
  const userId = localStorage.getItem('userId')
  var token = localStorage.getItem('token')
  console.log(userId)
  var dispatch  = useDispatch()
  var url = "http://localhost:9000/logout"
  var clearToken = async () =>{
    token=null
    localStorage.clear()
    try {
      var config = {
        "Content-Type":"application/json"
      }
      var body = {token}
    
      const res = await axios.post(url,body)
      window.location.replace('http://localhost:3000')
      
    } catch (error) {
      
     
    }
  }
  const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
  console.log(isLoggedIn)
  const userHeader =   <>{ token===null ?
     <>
     <header className='header'>
         <div>
             <Link className='links' to="/">Home</Link>
         </div>
         <nav className="navbar">
             <ul>
                 <Link  className='links' to="/login">Login</Link>
                 <Link className='links' to="/signup">Signup</Link>
             </ul>
         </nav>
     </header>
     </>:
     
   <>
    
      <header className='header'>
          <div>
              <Link className='links' to="/timeline"><HomeOutlined className='sideIcons'/></Link>
          </div>
          <nav className="navbar">
              <ul>
                  <Link className='links' to={"/"+userId+"/inbox"}><ChatBubbleOutline className='sideIcons'/> <span>2</span></Link>
                  <Link className='links' to={"/"+userId+"/user"}><AccountBoxOutlined className='sideIcons'/>
                   {/* <p>Profile</p> */}
                  </Link>
                  <Link className='links' to="/" onClick={clearToken}><LogoutOutlined className='sideIcons'/></Link>
              </ul>
          </nav>
      </header>
      </>
  }</>
  return (
    <>
   
    {userHeader}
   

    </>
   
  )
}

export default Header