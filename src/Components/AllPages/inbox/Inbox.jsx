import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './Inbox.css';
import { format } from 'date-fns';
import { GenerateAvatar } from '../../Reducers/GenerateAvatar';
import LeftSideBar from '../../LeftSideBar/LeftSideBar';
import Navbar from '../../Navbar/Navbar';
import Trash from '../../../Assests/Bin.svg';
import forward from '../../../Assests/Forward.svg';
import reply from '../../../Assests/Reply.svg';
import ConfirmationDialog from '../../Reducers/ConfirmationDialog';

function Inbox() {
  const [showAllRecipients, setShowAllRecipients] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmedAction, setConfirmedAction] = useState(null);

  const [composeData, setComposeData] = useState({
    subject: '',
    recipients: '',
    content: '',
  });
  const [receivedMails, setReceivedMails] = useState([]);
  const [composingEmail, setComposingEmail] = useState(false);

  const [selectedMail, setSelectedMail] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMailId, setSelectedMailId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const sentMailsPerPage = 10; 
  const indexOfLastInboxMail = currentPage * sentMailsPerPage;
  const indexOfFirstInboxMail = indexOfLastInboxMail - sentMailsPerPage;
  const currentInboxMails = receivedMails.slice(indexOfFirstInboxMail, indexOfLastInboxMail);
    

  
useEffect(() => {
  fetchReceivedMails();
}, []);

useEffect(() => {
  if (receivedMails.length > 0) {
    setSelectedMail(receivedMails[0]);
    setSelectedMailId(receivedMails[0].id);
  }
}, [receivedMails]);


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
      handleCancelCompose();
    } catch (error) {
      setError('Error fetching mail details.');
      setTimeout(() => {
        setError('');
      }, 3000);
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
  const handleDeleteMailWithConfirmation = (id) => {
    setConfirmationMessage('Are you sure you want to delete this email?');
    setConfirmedAction(() => () => handleDeleteMail(id));
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (confirmedAction) {
      confirmedAction();
    }
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };
  
  const toggleRecipientExpansion = () => {
    setShowAllRecipients(!showAllRecipients);
  };

  const handleReply = () => {

    const replySubject = `Re: ${selectedMail.subject}`;
    const replyRecipients = [selectedMail.sender]; 

  

    setComposeData({
      subject: replySubject,
      recipients: replyRecipients.join(', '), 
    });
    setTimeout(() => {
      ContentInputRef.current.focus();
    }, 0);
    setComposingEmail(true);
  };
  const recipientsInputRef = useRef(null);
  const ContentInputRef=useRef(null);

  const handleForward = () => {
    const forwardSubject = `Fwd: ${selectedMail.subject}`;
    const forwardContent = selectedMail.content; 
  
    
    setComposeData({
      subject: forwardSubject,
      recipients: '', 
      content: forwardContent,
    });
    setTimeout(() => {
      recipientsInputRef.current.focus();
    }, 0);

    setComposingEmail(true);
  };

  const handleCancelCompose = () => {

    setComposeData({
      subject: '',
      recipients: '',
      content: '',
    });
    setComposingEmail(false);
  };
  
  const handleSend = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);

      const { recipients, subject, content } = composeData;

      await axios.post(
        'https://localhost/mails',
        {
          recipients: recipients.split(','),
          subject,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setComposeData({
        recipients: '',
        subject: '',
        content: '',
      });
    
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  return (
    <div className='Inbox'>
      <Navbar />
      <div className="Mail-List">
      <LeftSideBar />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
      {currentInboxMails.map((mail) => (
          <li key={mail.id} className={mail.id === selectedMailId ? 'selected-mail ' : ''} onClick={() => handleViewMail(mail.id)} >
            <div className="mail-f">
           <div className="avatar">
            {GenerateAvatar(mail.sender)}
              <div className="mail">
              
                <p className="sender">{mail.sender}</p>
                <p className="subject">{mail.subject}</p>
              </div>
              </div>
              <div className="delete">
                <p>{format(new Date(mail.time), 'MMM d')}</p>
                <button onClick={(e) => { e.stopPropagation();
                handleDeleteMailWithConfirmation(mail.id);                }}
                className='del'>
                <img src={Trash} alt="Trash" width="18px" style={{ opacity: "0.7" }}/>
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
      {composingEmail ? (
    <div className="Mail-Content">
      <h2>Compose Email</h2>
      {composeData && (
  <div className="email-composition">
    <input
      className='compose-input'
      type="text"
      required
      placeholder="Recipients"
      value={composeData.recipients}
      ref={recipientsInputRef}
      onChange={(e) => setComposeData({ ...composeData, recipients: e.target.value })}
    />
    <input
      className='compose-input'
      type="text"
      placeholder="Subject"
      value={composeData.subject}
      required
      onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
    />
    <textarea
      className='compose-textarea'
      placeholder="Compose your message..."
      required
      ref={ContentInputRef}
      value={composeData.content}
      onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
    />
    <div className="button-container">
          <button onClick={handleCancelCompose} className='compose-button cancel-button'>Cancel</button>
          <button onClick={handleSend} className='compose-button send-button'>Send</button>
        </div>
     </div>
)}
    </div>
  ):selectedMail ? (
        <div className='Mail-Content'>
          <h2>{selectedMail.subject}</h2>
          <div className="out">
          {GenerateAvatar(selectedMail.sender)} 
          <div className="in">
{selectedMail && <p className="view">From : {selectedMail.sender}</p>}       
   {/* <p className="view">To : {selectedMail.recipients.join(', ')}</p> */}
          {selectedMail.recipients.length > 1 ? (
    <>
      <p className='view'>
        To: {selectedMail.recipients[0]}, {selectedMail.recipients[1]}
        {selectedMail.recipients.length > 2 ? (
          <span
            className="expand-recipients"
            onClick={() => toggleRecipientExpansion(!showAllRecipients)}
          >
            ...
          </span>
        ) : null}
      </p>
      {showAllRecipients && (
        <p className='view'>
          {selectedMail.recipients.slice(2).join(', ')}
        </p>
      )}
    </>
  ) : (
    <p className='view'>To: {selectedMail.recipients[0]}</p>
  )}
          </div>

          <div className="mail-view-time">
          <p>{format(new Date(selectedMail.time), 'MMM d h:mm a')}</p>
          <div className="inin">
          <button onClick={handleReply} className='replyforward'>Reply <img src={reply} alt="forward" width="15px" /></button>
          <button onClick={handleForward} className='replyforward'>Forward <img src={forward} alt="forward" width="15px"/></button>
          </div>
          </div>
          
          </div>

          <hr />
          <div
      dangerouslySetInnerHTML={{ __html: selectedMail.content }}
      className='mail-content-html'
    ></div>


        </div>
      ) : receivedMails.length > 0 ? (
        <div className='Mail-Content'>
          <h2>{receivedMails[0].subject}</h2>
          <div className="out">
            {GenerateAvatar(receivedMails[0].sender)}
            <div className="in">
              <p className="view">From : {receivedMails[0].sender}</p>
              <p className="view">To : {receivedMails[0].recipients}</p>
            </div>
            <div className="mail-view-time">
              <p>{format(new Date(receivedMails[0].time), 'MMM d h:mm a')}</p>
              <div className="inin">
              <button onClick={handleReply} className='replyforward'>Reply <img src={reply} alt="forward" width="20px"  color='blue'/></button>
          <button onClick={handleForward} className='replyforward'>Forward <img src={forward} alt="forward" width="20px"  color='blue'/></button>
          </div>
          </div>
             
          </div>
    
          <hr />
          <div
            dangerouslySetInnerHTML={{ __html: receivedMails[0].content }}
            className='mail-content-html'
          ></div>
        </div>
      ):(
        <h5 style={{ padding: "15px" }}>No emails to display</h5>
      )}
      
    </div>
  

    {showConfirmation && (
        <ConfirmationDialog message={confirmationMessage} onConfirm={handleConfirm} onCancel={handleCancel} />
      )}

    </div>
  );
}

export default Inbox;
