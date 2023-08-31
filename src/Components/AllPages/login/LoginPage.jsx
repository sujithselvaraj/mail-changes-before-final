import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost/mails/authenticate', {
        username,
        password
      });

      const token = response.data.jwtToken;
      localStorage.setItem('token', token);

      navigate("/inbox")
    } catch (error) {
      setErrorMessage('Invalid username or password Check it!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };


  return (
    <div className='login-div' >
      <h2> HIT Login</h2>
      <form onSubmit={handleLogin}  className='login'>
        <div >
          <label>Email-Id:</label>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder='Email-Id' required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder='Password' required/>
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
        <NavLink to='/SignUp'>
           <p className='link'>Sign Up</p>
        </NavLink>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

    


    </div>

    



  );
}

export default LoginPage;
