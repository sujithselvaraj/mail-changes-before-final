import {useState} from 'react'

export function UseCommonState()
{
  const [showAllRecipients, setShowAllRecipients] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [confirmedAction, setConfirmedAction] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMailId, setSelectedMailId] = useState(null);
  const [receivedMails, setReceivedMails] = useState([]);
  const [composingEmail, setComposingEmail] = useState(false);
  const [sentMails, setSentMails] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [initialSelectionDone, setInitialSelectionDone] = useState(false);
  const [deletedMails, setDeletedMails] = useState([]);

  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
 


    return{
        showAllRecipients,setShowAllRecipients,showConfirmation,setShowConfirmation,confirmationMessage,setConfirmationMessage,confirmedAction,setConfirmedAction,
        receivedMails,setReceivedMails,composingEmail,setComposingEmail,selectedMail,setSelectedMail,loading,setLoading,error,setError,
        selectedMailId,setSelectedMailId,currentPage,setCurrentPage,username,setUsername,password,setPassword,errorMessage,setErrorMessage,sentMails,setSentMails,
        firstName,setFirstName,lastName,setLastName,email,setEmail,successMessage,setSuccessMessage,deletedMails,setDeletedMails,
        initialSelectionDone,setInitialSelectionDone,recipients,setRecipients,subject,setSubject,content,setContent
    };
}