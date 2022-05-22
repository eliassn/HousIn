import { AlarmOutlined, CalendarMonthOutlined, HouseOutlined, NotificationsOutlined, PeopleOutline, PersonAddAlt1Outlined, PersonOutline } from '@mui/icons-material'
import React from 'react'
import './dashboardSidebar.scss'

const DashboardSidebar = () => {
  return (
    <div className='dashSidebar'>
      <div className="top">Dashboard</div>
      <div className="mid">
        <ul>
          <li><PersonOutline className='icon'/><span>Clients</span></li>
          <br></br>
          <li><HouseOutlined className='icon'/><span>Propriétés</span></li>
          <br></br>
          <li><CalendarMonthOutlined className='icon'/><span>Calendrier</span></li>
          <br></br>
          <li><NotificationsOutlined className='icon'/><span>Réclamations</span></li>
        </ul>
      </div>
    </div>
  )
}

export default DashboardSidebar