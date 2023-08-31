import React from 'react'
import { NavLink } from 'react-router-dom'
import './LeftSideBar.css'
import sent from '../../assests/sent.svg';
import inbox from '../../assests/inbox.svg';
import trash from '../../assests/trash.svg';
import compose from '../../assests/compose.svg';
const LeftSideBar = () => {
  return (
    <div className='left-sidebar'>
         <nav className='side-nav'>
         <NavLink to='/Mail' className='side-nav-links ' activeClassname="active">
         <img src={compose} alt="Globe" width="18px" style={{opacity: "0.7"}}/>

           <p style={{paddingLeft:"10px"}}>Compose Mail</p>
        </NavLink>
        <NavLink to='/Inbox' className='side-nav-links ' activeClassname="active">
        <img src={inbox} alt="Globe" width="18px" style={{opacity: "0.7"}}/>

           <p style={{paddingLeft:"10px"}}>Inbox</p>
        </NavLink>
        <NavLink to='/SentBox' className='side-nav-links ' activeClassname="active">
        <img src={sent} alt="Globe" width="18px" style={{opacity: "0.7"}}/>

           <p style={{paddingLeft:"10px"}}>Outbox</p>
        </NavLink>
        <NavLink to='/Trash' className='side-nav-links ' activeClassname="active">
        <img src={trash} alt="Globe" width="18px" style={{opacity: "0.7"}}/>

           <p style={{paddingLeft:"10px"}}>Trash</p>
        </NavLink>
        </nav>
    </div>
  )
}

export default LeftSideBar
