import React from 'react'
import './newProfile.scss'
const NewProfile = () => {
  return (
    <div className='newProfile'>
        <div className='up'>
         <div className='photo'>
           <span className='img'>
             <img src="https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
           </span>
         </div>
         <div className='other'>other</div>
        </div>
        <div className='down'>down</div>
    </div>
  )
}

export default NewProfile