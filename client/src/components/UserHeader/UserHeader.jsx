import React from 'react'
import {ChatBubble, AccountBox, AccountBoxOutlined, ChatBubbleOutline, HomeRounded, HomeOutlined} from '@mui/icons-material'
import {Link} from 'react-router-dom'
const UserHeader = () => {
  return (
    <>
    <header className='header'>
        <div>
            <Link className='links' to="timeline"><HomeOutlined className='sideIcons'/></Link>
        </div>
        <nav className="navbar">
            <ul>
                <Link className='links' to="/inbox"><ChatBubbleOutline className='sideIcons'/> <span>2</span></Link>
                <Link className='links' to="/:id/user"><AccountBoxOutlined className='sideIcons'/>
                 {/* <p>Profile</p> */}
                </Link>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default UserHeader