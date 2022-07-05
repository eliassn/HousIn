import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Footer from './components/footer/Footer'
import Landing from './components/Landing/Landing'
import Login from './components/login/Login'
import SignUp from './components/signup/SignUp'
import Header from './components/Header/Header'
import Places from './components/places/Places'
import './index.scss'
import Error from './components/error/Error'
import User from './components/profile/user/User'
import UserHeader from './components/UserHeader/UserHeader'
import { useSelector } from 'react-redux'
import Timeline from './components/timeline/Timeline'
import CssGridTest from './components/CssGridTest'
import Messages from './components/messages/Messages'

const chooseHeader= ()=>{
  if(window.location.pathname.split('/')[1]==="" ||window.location.pathname.split('/')[1]==="login" ||window.location.pathname.split('/')[1]==="signup" ){
    localStorage.clear()
  }
}
const App = () => {
chooseHeader()
  // window.addEventListener('close',function(){
  //   localStorage.clear()
  // })
  const isRegistered = useSelector(state=>state.register.isRegistered)
  // const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
  // const isLoggedOut = useSelector(state=>state.logout.isLoggedOut)
  // console.log("loggedIn= ",isLoggedIn)
  console.log("isRegistered= ",isRegistered)
  // console.log('loggedOut= ',isLoggedOut)
  var url = "http://localhost:3000"
  var loggedIn = typeof(window.location.pathname.split('/')[1]) === "number"
  var loggedOut = typeof(window.location.pathname.split('/')[1]) !== "number"

  const token = localStorage.getItem('token')
  return (
    <div>
      
     <Router>
      
   <Header/>
    {/* {token&&<UserHeader/>} */}
       
       <Routes>
        <Route path='timeline' element={<Timeline/>}/>
       <Route exact path="/" element={ <><Landing/><Places/></>}/>
       
       <Route path=":user_id/user" element={<User/>}/>
       {/* <Route path=":user_id/profile" element={<NewProfile/>}/> */}
       <Route path='grid' element={<CssGridTest/>}/>
      
       <Route path="/login" element={  <Login/>}/>
      
       <Route path=":user_id/inbox" element={  <Messages/>}/>
       <Route path="signup" element={ <SignUp/>}/>
       <Route path="*" element={<Error/>}/>
       </Routes>
       
      
           

       <Footer/>
       
     </Router>
    </div>
  )
}

export default App