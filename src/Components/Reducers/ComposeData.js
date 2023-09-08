// import React,{useState,useRef} from 'react'
// import axiosInstance from './AxiosConfig';
// import { UseCommonState } from './UseCommonState';



// const ComposeData = () => {

//     const [composeData, setComposeData] = useState({
//         subject: '',
//         recipients: '',
//         content: '',
//       });
// const{setComposingEmail}=UseCommonState();

//       const handleSend = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           console.log(token);
    
//           const { recipients, subject, content } = composeData;
    
//           await axiosInstance.post(
//             {
//               recipients: recipients.split(','),
//               subject,
//               content,
//             }
//           );
      
//           setComposeData({
//             recipients: '',
//             subject: '',
//             content: '',
//           });
        
//         } catch (error) {
//           console.error('Error sending email:', error);
//         }
//       };

//       const handleCancelCompose = () => {

//         setComposeData({
//           subject: '',
//           recipients: '',
//           content: '',
//         });
//         setComposingEmail(false);
//       };


//       const recipientsInputRef = useRef(null);
//   const ContentInputRef=useRef(null);
//   return (
//     <div className="Mail-Content">
//       <h2>Compose Email</h2>
//       {composeData && (
//   <div className="email-composition">
//     <input
//       className='compose-input'
//       type="text"
//       required
//       placeholder="Recipients"
//       value={composeData.recipients}
//       ref={recipientsInputRef}
//       onChange={(e) => setComposeData({ ...composeData, recipients: e.target.value })}
//     />
//     <input
//       className='compose-input'
//       type="text"
//       placeholder="Subject"
//       value={composeData.subject}
//       required
//       onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
//     />
//     <textarea
//       className='compose-textarea'
//       placeholder="Compose your message..."
//       required
//       ref={ContentInputRef}
//       value={composeData.content}
//       onChange={(e) => setComposeData({ ...composeData, content: e.target.value })}
//     />
//     <div className="button-container">
//           <button onClick={handleCancelCompose} className='compose-button cancel-button'>Cancel</button>
//           <button onClick={handleSend} className='compose-button send-button'>Send</button>
//         </div>
//      </div>


// )}
//     </div>
//   )
// }

// export default ComposeData