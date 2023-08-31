
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inbox.css';
import { format } from 'date-fns';

import LeftSideBar from '../../LeftSideRouteBar/LeftSideBar';
import Navbar from '../Navbar/Navbar';
import trash from '../../../assests/trash.svg';

function Inbox() {
  const [receivedMails, setReceivedMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMailId, setSelectedMailId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const sentMailsPerPage = 10; 
  const indexOfLastInboxMail = currentPage * sentMailsPerPage;
  const indexOfFirstInboxMail = indexOfLastInboxMail - sentMailsPerPage;
  const currentInboxMails = receivedMails.slice(indexOfFirstInboxMail, indexOfLastInboxMail);
    
  function generateAvatar(sender) {
    if (!sender) return ''; // Handle cases with no sender
  
    const initials = sender.charAt(0).toUpperCase(); // Get the first letter and make it uppercase
  
    // Check if a color is already set for this user in localStorage
    let userBackgroundColor = localStorage.getItem(`userBackgroundColor_${sender}`);
  
    // If no color is set, generate a random color and store it in localStorage
    if (!userBackgroundColor) {
      userBackgroundColor = getRandomColor();
      localStorage.setItem(`userBackgroundColor_${sender}`, userBackgroundColor);
    }
  
    // Determine the text color based on background color
    const textColor = getTextColor(userBackgroundColor);
  
    // Define a style for the avatar
    const avatarStyle = {
      backgroundColor: userBackgroundColor,
      color: textColor,
      borderRadius: '50%',
      width: '40px', // Adjust the size as needed
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px', // Adjust the font size as needed
    };
  
    return (
      <div style={avatarStyle}>
        {initials}
      </div>
    );
  }
  
  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  function getTextColor(bgColor) {
    const colorPairs = [
      { background: '#008080', text: '#FFFFFF' }, // Teal
      { background: '#4169E1', text: '#FFFFFF' }, // Royal Blue
      { background: '#DC143C', text: '#FFFFFF' }, // Crimson
      { background: '#708090', text: '#FFFFFF' }, // Slate Gray
      { background: '#DAA520', text: '#000000' }, // Goldenrod
      { background: '#9932CC', text: '#FFFFFF' }, // Dark Orchid
      { background: '#6B8E23', text: '#FFFFFF' }, // Olive Drab
      { background: '#A0522D', text: '#FFFFFF' }, // Sienna
      { background: '#9370DB', text: '#000000' }, // Medium Purple
      { background: '#008B8B', text: '#FFFFFF' }, // Dark Cyan
    ];
  
    // Find a matching text color based on the background color
    const matchingPair = colorPairs.find(pair => pair.background === bgColor);
  
    // If no matching pair is found, use a default text color
    return matchingPair ? matchingPair.text : '#000000';
  }
  
  useEffect(() => {
    fetchReceivedMails();
  }, []);

  const fetchReceivedMails = async () => {
    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.get('https://localhost/mails/received-mails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setReceivedMails(response.data.data.reverse());
      setLoading(false);
    } catch (error) {
      setError('Error fetching received mails.');
      setTimeout(() => {
        setError('');
      }, 3000);
      setLoading(false);
    }
  };

  const handleViewMail = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.log(id);
      const response = await axios.get(`https://localhost/mails/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setSelectedMail(response.data);
      setSelectedMailId(id); 
    } catch (error) {
      setError('Error fetching mail details.');
    }
  };

  const handleDeleteMail = async (id) => {
    try {
      console.log(id);
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost/mails/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setReceivedMails(receivedMails.filter(mail => mail.id !== id));
  if (selectedMailId === id) {
    setSelectedMail(null);
    setSelectedMailId(null);
  }
    } catch (error) {
      setError('Error deleting mail.');
    }
  };


  // const handleDeleteMail = async (id) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     await axios.delete(`http://localhost:8080/mails/delete/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  
  //     // Remove the deleted mail from the deletedMails state
  //     setDeletedMails(deletedMails.filter(mail => mail.id !== id));
  
  //     // If the deleted mail was the selected mail, clear the selectedMail and selectedMailId
    
  //   } catch (error) {
  //     setError('Error deleting mail.');
  //   }
  // };
  

  return (
    <div className='Inbox'>
      <Navbar />
      <div className="Mail-List">
      <LeftSideBar />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
      {currentInboxMails.map((mail) => (
          <li key={mail.id} className={mail.id === selectedMailId ? 'selected-mail ' : ''} onClick={() => handleViewMail(mail.id)}>
            <div className="mail-f">
           <div className="avatar">
            {generateAvatar(mail.sender)}
              <div className="mail">
              
                <p className="sender">{mail.sender}</p>
                <p className="subject">{mail.subject}</p>
              </div>
              </div>
              <div className="delete">
                <p>{format(new Date(mail.time), 'MMM d')}</p>
                <button onClick={(e) => { e.stopPropagation();
                  handleDeleteMail(mail.id);
                }}
                className='del'>
                <img src={trash} alt="Globe" width="18px" style={{ opacity: "0.7" }}/>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="button">
      <div className="pagination">
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <button
    onClick={() => setCurrentPage(currentPage + 1)}
    disabled={indexOfLastInboxMail >= receivedMails.length}
  >
    Next
  </button>
  </div>
</div>
      </div>
    
      <div className='Viewing-Mail'>
      {selectedMail ? (
        <div className='Mail-Content'>
          <h2>{selectedMail.subject}</h2>
          <div className="out">
          {generateAvatar(selectedMail.sender)}
          <div className="in">
          <p className="view">From : {selectedMail.sender}</p>
          <p className="view">To : {selectedMail.recipients}</p>
          </div>
          <div className="mail-view-time">
          <p>{format(new Date(selectedMail.time), 'MMM d h:mm a')}</p>
          </div>
          </div>

          <hr />
          <div
      dangerouslySetInnerHTML={{ __html: selectedMail.content }}
      className='mail-content-html'
    ></div>


        </div>
      ) : (
        <h5 style={{padding:"15px"}}>Select a mail to view</h5>
      )}
      
    </div>
  
    </div>
  );
}

export default Inbox;
