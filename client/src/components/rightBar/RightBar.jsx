import React,{useState} from 'react'
import './rightBar.scss'
import {Publish,Create} from '@mui/icons-material'
import ModalForm from '../modal/ModalForm'
import ReusableForm from '../../reusableForm/ReusableForm'
const RightBar = () => {
    const [openPopup,setOpenPopup] = useState(false)
  return (
    <div>
        <div className="top">
            <ul>
                <li onClick={()=>{
            setOpenPopup(true)
        }}><Create/><span>Crée une publication</span></li>
              
            </ul>
        </div>
        <ModalForm  openPopup={openPopup} setOpenPopup={setOpenPopup} >
            <ReusableForm/>
        </ModalForm>
        <div className="search">
            {/* <label >Rechercher une propriété</label>
            <input type="search" name="search" id="search" /> */}
        </div>
    </div>
  )
}

export default RightBar