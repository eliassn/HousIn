import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerActions } from '../../redux/registerSlice'

const SignUp = () => {
  
//user
const [formData,setFormData] = useState({
  firstName: "",
  lastName:"",
  phone:"",
  gender:"",
  job:"",
  isCompany:false,
  email: "",
  password : "",
  password2 : ""
})
const {firstName,lastName,phone,gender,job,isCompany,email,password,password2} = formData

const handleChange = e => {
 setFormData({...formData,[e.target.name]:e.target.value})
  
}

  const dispatch = useDispatch()
  const handleSubmit = async (e) =>{
    e.preventDefault()
    var url = "http://localhost:9000/register"
    if(password !== password2){
      console.log("passwords do not match")
      return
    }
    const newUser = {
      firstName,
      lastName,
      phone,
      gender,
      job,
      isCompany,
      email,
      password
    }
    try {
      const config={
       "headers":{
        "Content-Type":"application/json"
       }
      }
      const body = JSON.stringify(newUser)
      console.log(body)
      const res = await axios.post(url,body,config)
      console.log(res.data)
    } catch (err) {
      console.error(err.response.data)
    }
    dispatch(registerActions.register())
    window.location.replace("/login")
  }
  return (
    <>
     <section className="landing login">
       <div className="overlay">
         <form onSubmit={handleSubmit} className="form">
           <input type="text" name="firstName" value={firstName} id="fname" placeholder='nom' onChange={handleChange} required/>
           <input type="text" name="lastName" value={lastName} id="lname" placeholder='prénom' onChange={handleChange} required/>
           <input type="tel" name="phone" value={phone} id="tel" placeholder='téléphone' onChange={handleChange} required/>
           {/* <select name="" onChange={handleChange}  id="">
             <option value="homme">Homme</option>
             <option value="femme">Femme </option>
           </select>
           <select name="" onChange={handleChange} id="">
             <option value="j'ai une propriété à louer ou à vendre">j'ai une propriété à louer ou à vendre</option>
             <option value="je cherche à louer ou à acheter une propriété">je cherche à louer ou à acheter une propriété </option>
           </select> */}
           <select onChange={handleChange}  >
             <option value="true">entreprise</option>
             <option value="false">individuel</option>
           </select>
           <input type="email" name="email" value={email} id="email" placeholder='email' onChange={handleChange} required/>
           <input type="password" name="password" value={password} id="password1" placeholder='password' onChange={handleChange} required/>
           <input type="password" name="password2" value={password2} id="password2" placeholder='confirm your password' onChange={handleChange} required/>
           <button type="submit">Create Account</button>
         </form>
       </div>
       </section> 
    </>
  )
}

export default SignUp