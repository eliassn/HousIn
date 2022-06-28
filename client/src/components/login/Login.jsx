import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginActions } from '../../redux/loginSlice'
import { userActions } from '../../redux/userSlice'




const Login = () => {
  // var cookies = document.cookie._hjSessionUser_171201
  // console.log(cookies)
const dispatch = useDispatch()
const [user,setUser] = useState(null)
const [login,setLogin] = useState({
  email:"",
  password:""
})
const {email,password} = login
const handleChange = e =>{
  setLogin({...login,[e.target.name]:e.target.value})

}



const handleSubmit = async (e) =>{
  e.preventDefault()
  var url = 'http://localhost:9000/login'
  const existingUser= {
    email,
    password
  }
  try {
    var config = {
      "headers":{
        "Content-Type":"application/json",
        
       
        
      }
    }
   
    const body = JSON.stringify(existingUser)
   const res =  await axios.post(url,body,config)

// }).catch(err => {
//   console.error(err);
  // ('Error login in please try again!');;
  
  
  
   const authToken = res.data.token
   localStorage.setItem('token',authToken)
   const refresh = res.data.refreshToken
   localStorage.setItem('refreshToken',refresh)
   const userId = res.data.uid
   console.log(userId)
   localStorage.setItem('userId',userId)
  //  console.log(authToken)
   
//  var user = dispatch(userActions.setUser(res.data))
//   console.log()

//   console.log(user)
  //  const id = res.data.uid
  //  console.log(id)
 
   dispatch(loginActions.login())
  window.location.replace(`${res.data.uid}/user`)
  //  return res
  } catch (error) {
    console.error(error.response.data)
  }
  
 
  console.log(setLogin)

}
  return (
    <>
     <section className="landing login">
       <div className="overlay">
         <form onSubmit={handleSubmit} className="form">
           <input type="email" name="email" id="email" value={email} placeholder='email' onChange={handleChange} required/>
           <input type="password" name="password" id="password" value={password} placeholder='password' onChange={handleChange}  required/>
             <button type="submit">Log In</button>
         </form>
       </div>
     </section>
    </>
  )
}

export default Login