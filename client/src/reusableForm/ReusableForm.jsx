import { Input, LocationCityOutlined, LocationOn, PersonOutline, PhoneOutlined, PhotoCamera, PhotoCameraOutlined, PriceCheckOutlined } from '@mui/icons-material'
import { Button, Select } from '@mui/material'
import React from 'react'
import './reusableForm.scss'

const ReusableForm = () => {
    const Gouvernorats = ["Gouvernorat de l'Ariana",
    "Gouvernorat de Béja",
    "Gouvernorat de Ben Arous",
   " Gouvernorat de Bizerte",
  "  Gouvernorat de Gabès",
    "Gouvernorat de Gafsa",
    "Gouvernorat de Jendouba",
   " Gouvernorat de Kairouan",
   " Gouvernorat de Kasserine",
    "Gouvernorat de Kébili",
   " Gouvernorat du Kef",
    "Gouvernorat de Mahdia",
    "Gouvernorat de Manouba",
    "Gouvernorat de Médenine",
    "Gouvernorat de Monastir",
   " Gouvernorat de Nabeul",
    "Gouvernorat de Sfax",
   " Gouvernorat de Sidi Bouzid",
    "Gouvernorat de Siliana",
    "Gouvernorat de Sousse",
    "Gouvernorat de Tataouine",
    "Gouvernorat de Tozeur",
    "Gouvernorat de Tunis",
    "Gouvernorat de Zaghouan"]
  return (
    <div>
        <form action="" className='reuseForm'>
            <div className="inputFields">
            <label><PhotoCameraOutlined/>Images*</label>
                <input type='file'  multiple required/>
                <label><PersonOutline/>NOM*</label>
                <input type='text' placeholder='taper votre nom' required/>
                <label><PriceCheckOutlined/>Prix*</label>
                <input type='text' placeholder='prix' required />
                <label><PhoneOutlined/>Téléphone*</label>
                <input type='tel' placeholder='téléphone' required/>
                <label><LocationOn/>Gouvernorat*</label>
                <select>
                   {Gouvernorats.map(gov=>{
                       return <option>{gov}</option>
                   })}
                </select>
                <label><LocationCityOutlined/>Ville*</label>
                <input type='text' placeholder='ville' required/>
            </div>
           <Button type='submit'>Publier</Button>
           <Button type='reset'>Reset</Button>
        </form>
    </div>
  )
}

export default ReusableForm