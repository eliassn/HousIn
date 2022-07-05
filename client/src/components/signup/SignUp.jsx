import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerActions } from '../../redux/registerSlice'
import { countriesStates } from '../countriesAndStates/Countries'
const SignUp = () => {
  
//user
const [formData,setFormData] = useState({
  firstName: "",
  lastName:"",
  phone:"",
  picture:[],
  job:"",
  nationality:"",
  isCompany:false,
  email: "",
  password : "",
  password2 : "",
 
})
const {firstName,lastName,phone,picture,job,nationality,isCompany,email,password,password2} = formData
const uploadImage =  (e)=>{
    
  var fileArr = [e.target.files]
  console.log(fileArr)
   fileArr.forEach(file=>{
     picture.push(file)
     
   })
   setFormData({...formData,picture:e.target.files[0]})
   console.log(picture)
   
 }
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
    var formData = new FormData()
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('phone',phone)
    formData.append('picture',picture)
    formData.append('job',job)
    formData.append('nationality',nationality)
    formData.append('isCompany',isCompany)
    formData.append('email',email)
    formData.append('password',password)
  
    // const newUser = {
    //   firstName,
    //   lastName,
    //   phone,
    //   picture,
    //   job,
    //   isCompany,
    //   email,
    //   password
    // }
    try {
      const config={
       "headers":{
        "Content-Type":"application/json"
       }
      }
      // const body = JSON.stringify(newUser)
      // console.log(body)
      const res = await axios.post(url,formData,config)
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
            {/* <input type="hidden" name="messageId" value={} /> */}
           <label>photo de profil</label>
           <input type="file" name="picture" onChange={(e)=>uploadImage(e)}/>
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
           <label>Nationality</label>
           <select id='place' name='nationality' value={nationality} onChange={handleChange}>
                   {
                   
                   countriesStates.countries.map((country)=>{
                    
                      return  <option id='gov' selected key={country.country} value={country.country}>{country.country}</option>
                      
                   })}
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