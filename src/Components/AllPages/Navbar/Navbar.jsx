
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Navbar.css';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  function handleClick()
 { 
    navigate("/Inbox");
}


  return (
    <nav className="main-nav">
      <div className="Navbar">
        <h2 onClick={handleClick}>Hit Mail</h2>
       
        <input type="text" placeholder="Search..." className="SearchBar" />
    
      </div>
      <div className="Navbar-right">
        <button onClick={handleLogout} className="LogoutButton">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
