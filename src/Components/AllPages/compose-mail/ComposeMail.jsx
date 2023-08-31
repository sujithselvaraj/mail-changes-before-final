import React, { useState } from 'react';
import axios from 'axios';
import './ComposeMail.css'
import LeftSideBar from '../../LeftSideRouteBar/LeftSideBar';
import Navbar from '../Navbar/Navbar';
import Background from '../../../assests/Background.svg'
function ComposeMail() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRecipientsChange = (event) => {
    setRecipients(event.target.value);
  };

  const handleSubjectChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedSubject = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setSubject(capitalizedSubject);
  };

  const handleContentChange = (e) => {
    const inputValue = e.target.value;
    const capitalizedSubject = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setContent(capitalizedSubject);
  };

  const handleComposeMail = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log(token)
        await axios.post('https://localhost/mails', {
        recipients: recipients.split(','),
        subject,
        content
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSuccessMessage('Mail sent successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      setRecipients('');
      setSubject('');
      setContent('');
    } catch (error) {
      setErrorMessage('Error sending mail ,Enter an valid recipient!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    
    <div className='ComposeMail'>
      <Navbar/>
      <LeftSideBar/>

    <div className="ComposeMail-Container">
    <h1 style={{fontFamily:"Poppins,sans-serif"}}>Compose Mail</h1>
    <img src={Background} alt="" width="500" style={{display: "flex",position:"absolute", left: "500px",top:"45px", margin: "0%"}} />
      <form onSubmit={handleComposeMail} className='form'>
        <div className="form-item">
        <div className='item'>
          <label>Recipients (comma-separated):</label>
          <input type="text" value={recipients} onChange={handleRecipientsChange} className='input' required/>
        </div>
        <div className='item'>
          <label>Subject:</label>
          <input type="text" value={subject} onChange={handleSubjectChange} className='input' required/>
        </div>
        <div className='item'>
          <label>Content:</label>
          <textarea value={content} onChange={handleContentChange} className='text' required></textarea>
        </div>
        </div>
        <button type="submit" className='review-btn'>Send</button><br/>
        {successMessage && <p style={{ color: 'green' ,padding:"60px"}}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' ,padding:"60px"}}>{errorMessage}</p>}
      
      </form>
      </div>
    </div>
  );
}

export default ComposeMail;
