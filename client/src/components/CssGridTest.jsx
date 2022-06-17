import axios from 'axios'
import React,{useState} from 'react'

const CssGridTest = () => {

const [images,setImages] = useState({
  photos:[]
})
const {photos} = images

  function handleChange(e){
  setImages({...images,photos:[...e.target.files]})
  console.log("photos",photos)
  }
  async function handleSubmit(e){
  e.preventDefault()
  
  var config = {
    "headers":{
      "Content-Type":"application/json"
    }
  }
  var newImages = {
    photos
  }
  try {
    var req = JSON.stringify(newImages)
    var res = await axios.post('http://localhost:9000/images',req,config)
  console.log("res= ",res.data)
    
  } catch (error) {
    console.error(error.response.data)
  }
  
  }
  return (
   <form onSubmit={handleSubmit}>
      <input type='file' encType='multipart/form-data' multiple onChange={handleChange}/>
     <button type="submit" >submit</button>
   </form>
  )
}

export default CssGridTest