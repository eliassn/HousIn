import { DescriptionOutlined, Input, LocationCityOutlined, LocationOn, MergeTypeOutlined, PersonOutline, PhoneOutlined, PhotoCamera, PhotoCameraOutlined, PriceCheckOutlined } from '@mui/icons-material'
import { Button, Select } from '@mui/material'
import axios from 'axios'
import React,{useState} from 'react'
import './reusableForm.scss'
import { countriesStates } from '../components/countriesAndStates/Countries'
var states = []
var countries = countriesStates.countries
var stateMap = countries.forEach(country=>{
  states.push(country.states)
})
console.log(states)
const ReusableForm = () => {
  
  const [modalData,setModalData] = useState({
    photos:[],
    price:"",
    likes:[],
    type:"",
    tel:"",
    place:"",
    description:""
  })
 

  const {photos,price,likes,type,tel,place,description} = modalData
  
  

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
    var select = document.getElementById('place')
    var option  = document.getElementById('gov')
    console.log("select=",select.value,"option=",option.value)
  }

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
                <label><PriceCheckOutlined/>Prix*</label>
                <input type='text' name='price' onChange={handleChange} placeholder='prix' value={price}  required />
                <label><PhoneOutlined/>Téléphone*</label>
                <input type='tel' name='tel' value={tel} onChange={handleChange} placeholder='téléphone' required/>
                <label><LocationOn/>Pays*</label>
                <select id='place' name='place' value={place} onChange={handleChange}>
                   {countriesStates.countries.map(country=>{
                      return  <option id='gov' key={country} value={country.country}>{country.country}</option>
                      
                   })}
                </select>
                <select id='states' name='states' value={states} onChange={handleChange}>
                   {countriesStates.countries.map(country=>{
                      return  <option id='gov' key={country} value={country.country}>{country.country}</option>
                      
                   })}
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