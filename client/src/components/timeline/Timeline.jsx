import React,{useState,useEffect} from 'react'
import UserCard from '../userCard/UserCard'
import './timeLine.scss'
import { getAllInTimeLine } from '../api/getters'

const Timeline = () => {
   
  return (
    <div>
        <UserCard/>
    </div>
  )
}

export default Timeline