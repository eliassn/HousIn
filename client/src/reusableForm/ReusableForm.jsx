import { DescriptionOutlined, Input, LocationCity, LocationCityOutlined, LocationOn, MergeTypeOutlined, PersonOutline, PhoneOutlined, PhotoCamera, PhotoCameraOutlined, PriceCheckOutlined } from '@mui/icons-material'
import { Button, Select } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import './reusableForm.scss'
import { countriesStates } from '../components/countriesAndStates/Countries'




// console.log("value",countryName.attributes['value'])
var states = []


// var stateMap = countries.forEach(country=>{
//   countryVar = country
//   country.states.forEach(state=>{
//     states.push(state)
//   })
  
// })
// console.log(countryName.value)






const ReusableForm = () => {
  var select = document.getElementById('place')
  function getStateByCountryName(countryName){
    var result = []
    var country = ""
    var countries = countriesStates.countries
    for(let i = 0;i<countries.length;i++){
    country = countries[i].country
    if(countryName===country){
      countries[i].states.forEach(state=>{
        result.push(state)
      })
    }
    }
  
  
    return result
  }
  var stateByCountry = getStateByCountryName(select?.value)
  const [modalData,setModalData] = useState({
    photos:[],
    price:"",
    likes:[],
    type:"",
    tel:"",
    place:"",
    state:"",
    description:""
  })
 

  const {photos,price,state,likes,type,tel,place,description} = modalData
  
 

  const uploadImage =  (e)=>{
    
   var fileArr = [e.target.files]
   console.log(fileArr)
    fileArr.forEach(file=>{
      photos.push(file)
      
    })
    setModalData({...modalData,photos:e.target.files})
    console.log(photos)
    
  }

  const handleChange = e =>{
    setModalData({...modalData,[e.target.name]:e.target.value})
    console.log("changed")
     
    var option  = document.getElementById('gov')
    console.log("select=",select.value,"option=",option.value)
  }
  var option  = document.getElementById('gov')
  // console.log("country",option.value)
  const handleSubmit = async (e) =>{
   

    
    e.preventDefault()
    var path = window.location.pathname.split('/')
    const user_id  = path[1]
    console.log(user_id)
    var url = `http://localhost:9000/${user_id}/user`
    var reloadUrl = `http://localhost:3000/${user_id}/user`
    var formData = new FormData()
    for(let i = 0;i<photos.length;i++){
      formData.append('photos',photos[i])
    }
    formData.append('price',price)
    formData.append('type',type)
    formData.append('tel',tel)
    formData.append('place',place)
    formData.append('state',state)
    formData.append('description',description)
    
    const token = localStorage.getItem('token')
    try {
      const config = {
        "headers":{
          "Content-Type":"multipart/form-data",
         "x-access-token": token
        }
      }
      
     
      var res = await axios.post(url,formData,config)
      console.log(res.data)
      window.location.replace(reloadUrl)
    } catch (error) {
      console.error(error.response.data)
    }
  }
  //   const Gouvernorats = ["Gouvernorat de l'Ariana",
  //   "Gouvernorat de Béja",
  //   "Gouvernorat de Ben Arous",
  //  " Gouvernorat de Bizerte",
  // "  Gouvernorat de Gabès",
  //   "Gouvernorat de Gafsa",
  //   "Gouvernorat de Jendouba",
  //  " Gouvernorat de Kairouan",
  //  " Gouvernorat de Kasserine",
  //   "Gouvernorat de Kébili",
  //  " Gouvernorat du Kef",
  //   "Gouvernorat de Mahdia",
  //   "Gouvernorat de Manouba",
  //   "Gouvernorat de Médenine",
  //   "Gouvernorat de Monastir",
  //  " Gouvernorat de Nabeul",
  //   "Gouvernorat de Sfax",
  //  " Gouvernorat de Sidi Bouzid",
  //   "Gouvernorat de Siliana",
  //   "Gouvernorat de Sousse",
  //   "Gouvernorat de Tataouine",
  //   "Gouvernorat de Tozeur",
  //   "Gouvernorat de Tunis",
  //   "Gouvernorat de Zaghouan"]
  return (
    <div>
      
        <form onSubmit={handleSubmit}  className='reuseForm'>
            <div className="inputFields">
            <label><PhotoCameraOutlined/>Images*</label>
                <input type="file" multiple name="photos" onChange={(e)=>{uploadImage(e)}}/>
                <label><MergeTypeOutlined/>type*</label>
                <input type='text' name='type' value={type}  placeholder='s + 1' onChange={handleChange}required/>
                <label><PriceCheckOutlined/>Price*</label>
                <input type='text' name='price' onChange={handleChange} placeholder='prix' value={price}  required />
                <label><PhoneOutlined/>Phone*</label>
                <input type='tel' name='tel' value={tel} onChange={handleChange} placeholder='téléphone' required/>
                <label><LocationOn/>Country*</label>
                <select id='place' name='place' value={place} onChange={handleChange}>
                   {
                   
                   countriesStates.countries.map((country)=>{
                    
                      return  <option id='gov' selected key={country.country} value={country.country}>{country.country}</option>
                      
                   })}
                </select>
                <label><LocationCity/>State*</label>
                 <select id='states' name='state' value={state} onChange={handleChange}>
                  
                   {
                     
                    stateByCountry.map(state=>{
                     return <option id='go' key={state} value={state}>{state}</option>
                    })
                   }
                </select> 
              
               
               
                  
              
              
                
                <label><DescriptionOutlined/>Description*</label>
                <input type='text' name='description' placeholder='description' onChange={handleChange} value={description} required/>
            </div>
           <Button type='submit'>Publier</Button>
           <Button type='reset' onClick={()=>{
             
               var input = document.getElementsByTagName('input')
               input.value= ""
             
           }}>Reset</Button>
        </form>
    </div>
  )
}

export default ReusableForm