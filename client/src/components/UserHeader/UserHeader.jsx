import React from 'react'
import {ChatBubble, AccountBox, AccountBoxOutlined, ChatBubbleOutline} from '@mui/icons-material'
import {Link} from 'react-router-dom'
const UserHeader = () => {
  return (
    <>
    <header className='header'>
        <div>
            <Link className='links' to="/">Accueil</Link>
        </div>
        <nav className="navbar">
            <ul>
                <Link className='links' to="/inbox"><ChatBubbleOutline/> <span>2</span></Link>
                <Link className='links' to=":id/user"><AccountBoxOutlined/>
                 <p>Profile</p>
                </Link>
            </ul>
        </nav>
    </header>
    </>
  )
}

export default UserHeader