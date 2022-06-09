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


const App = () => {
  const isRegistered = useSelector(state=>state.register.isRegistered)
  const isLoggedIn = useSelector(state=>state.login.isLoggedIn)
  console.log("loggedIn= ",isLoggedIn)
  console.log("isRegistered= ",isRegistered)
  return (
    <div>
      
     <Router>
      
     {/* {!isLoggedIn && <Header/>} */}
      <UserHeader/>
       
       <Routes>
        <Route path='timeline' element={<Timeline/>}/>
       <Route exact path="/" element={ <><Landing/><Places/></>}/>
       
       <Route path=":user_id/user" element={<User/>}/>
       {/* <Route path=":user_id/profile" element={<NewProfile/>}/> */}
       
      
       <Route path="/login" element={  <Login/>}/>
      
       
       <Route path="signup" element={ <SignUp/>}/>
       <Route path="*" element={<Error/>}/>
       </Routes>
       
      
           

       <Footer/>
       
     </Router>
    </div>
  )
}

export default App