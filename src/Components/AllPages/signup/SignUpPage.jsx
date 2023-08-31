import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import { NavLink } from 'react-router-dom';

function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://localhost/mails/users', {
        firstName,
        lastName,
        email,
        password
      });

      setSuccessMessage('User created successfully');
      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Email Already taken ,try different one');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className='signup-div'>
      <h2>SignUp Page</h2>
      <form onSubmit={handleSignup} className='signup'>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={handleFirstNameChange} placeholder='first-name' required/>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={handleLastNameChange} placeholder='last-name' required/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} placeholder='email-id' required/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder='password' required/>
        </div>
        <button type="submit">Signup</button>
        <p>Already have an account?</p>
        <NavLink to='/'>
           <p className='link'>Login</p>
        </NavLink>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}

export default SignUpPage;
