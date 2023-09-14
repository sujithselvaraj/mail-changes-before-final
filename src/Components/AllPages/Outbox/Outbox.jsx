import React, { useState, useEffect, useRef } from "react";
import jwtDecode from 'jwt-decode';

import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import "./Outbox.css";
import Navbar from "../../Navbar/Navbar";
import { format } from "date-fns";
import forward from "../../../Assests/Forward.svg";
import { UseCommonState } from "../../Reducers/UseCommonState";
import axiosInstance from "../../Reducers/AxiosConfig";
import { keycloak } from "../../../keycloak";

function Outbox() {
  // const [sentMails, setSentMails] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [selectedMail, setSelectedMail] = useState(null);
  // const [selectedMailId, setSelectedMailId] = useState(null);
  // const jwtDecode = require('jwt-decode');

// Your Keycloak token
const keycloakToken = keycloak.token;

// Decode the token
const decodedToken = jwtDecode(keycloakToken);

// Access claims, e.g., username
const username = decodedToken.preferred_username;

console.log('Username:', username);

  console.log(keycloak.token);

  // const [showAllRecipients, setShowAllRecipients] = useState(false);
  const{sentMails,setSentMails,loading,setLoading,error,setError,selectedMail,setSelectedMail,selectedMailId,setSelectedMailId,showAllRecipients,setShowAllRecipients,
          currentPage,setCurrentPage,composingEmail,setComposingEmail}=UseCommonState();
  // const [currentPage, setCurrentPage] = useState(1);
  const sentMailsPerPage = 10;
  const indexOfLastSentMail = currentPage * sentMailsPerPage;
  const indexOfFirstSentMail = indexOfLastSentMail - sentMailsPerPage;
  const currentSentMails = sentMails.slice(
    indexOfFirstSentMail,
    indexOfLastSentMail
  );
  const [composeData, setComposeData] = useState({
    subject: "",
    recipients: "",
    content: "",
  });
  // const [composingEmail, setComposingEmail] = useState(false);

  const toggleRecipientExpansion = () => {
    setShowAllRecipients(!showAllRecipients);
  };

  useEffect(() => {
    fetchSentMails();
  }, []);
  useEffect(() => {
    if (sentMails.length > 0) {
      setSelectedMail(sentMails[0]);
      setSelectedMailId(sentMails[0].id);
    }
  }, [sentMails]);

  const fetchSentMails = async () => {
    try {
      console.log("enter")

      const response=await axiosInstance.get('/mails/get-send-emails',{
        headers:{
          Authorization: `Bearer ${keycloak.token}`,
          sender:username,
        }
      })
      console.log("token"+keycloak.token);
      console.log(response);
      setSentMails(response.data.data.reverse());
      setLoading(false);
    } catch (error) {
      setError("Error fetching sent mails.");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
  };

  const handleViewMail = async (id) => {
    try {
      
      const response=await axiosInstance.get(`/mails/${id}`)

      setSelectedMail(response.data);
      setSelectedMailId(id);
      handleCancelCompose();
    } catch (error) {
      console.error("Error fetching mail details:", error);
      setError("Error fetching mail details.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const recipientsInputRef = useRef(null);

  const handleForward = () => {
    const forwardSubject = `Fwd: ${selectedMail.subject}`;
    const forwardContent = selectedMail.content;

    setComposeData({
      subject: forwardSubject,
      recipients: "",
      content: forwardContent,
    });
    setTimeout(() => {
      recipientsInputRef.current.focus();
    }, 0);
    setComposingEmail(true);
  };

  const handleCancelCompose = () => {

    setComposeData({
      subject: "",
      recipients: "",
      content: "",
    });
    setComposingEmail(false);
  };

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const { recipients, subject, content } = composeData;

      await axiosInstance.post(
       "/mails",
        {
          recipients: recipients.split(","),
          subject,
          content,
        }
      );

      setComposeData({
        recipients: "",
        subject: "",
        content: "",
      });
      handleCancelCompose()
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  function GenerateAvatar(recipients) {
    if (!recipients) return ""; // Handle cases with no sender

    const initials = recipients[0].charAt(0).toUpperCase();
    let userBackgroundColor = localStorage.getItem(
      `userBackgroundColor_${recipients}`
    );


    if (!userBackgroundColor) {
      userBackgroundColor = getRandomColor();
      localStorage.setItem(
        `userBackgroundColor_${recipients}`,
        userBackgroundColor
      );
    }


    const textColor = getTextColor(userBackgroundColor);


    const avatarStyle = {
      backgroundColor: userBackgroundColor,
      color: textColor,
      borderRadius: "50%",
      width: "40px", 
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px", 
    };

    return <div style={avatarStyle}>{initials}</div>;
  }

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function getTextColor(bgColor) {
    const colorPairs = [
      { background: "#008080", text: "#FFFFFF" }, // Teal
      { background: "#4169E1", text: "#FFFFFF" }, // Royal Blue
      { background: "#DC143C", text: "#FFFFFF" }, // Crimson
      { background: "#708090", text: "#FFFFFF" }, // Slate Gray
      { background: "#DAA520", text: "#000000" }, // Goldenrod
      { background: "#9932CC", text: "#FFFFFF" }, // Dark Orchid
      { background: "#6B8E23", text: "#FFFFFF" }, // Olive Drab
      { background: "#A0522D", text: "#FFFFFF" }, // Sienna
      { background: "#9370DB", text: "#000000" }, // Medium Purple
      { background: "#008B8B", text: "#FFFFFF" }, // Dark Cyan
    ];

    // Find a matching text color based on the background color
    const matchingPair = colorPairs.find((pair) => pair.background === bgColor);

    // If no matching pair is found, use a default text color
    return matchingPair ? matchingPair.text : "#000000";
  }

  return (
    <div className="Outbox">
      <Navbar />
      <div className="Mail-List">
        <LeftSideBar />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {currentSentMails.map((mail) => (
            <li
              key={mail.id}
              className={mail.id === selectedMailId ? "selected-mail" : ""}
              onClick={() => handleViewMail(mail.id)}
            >
              <div className="mail-f">
                <div className="avatar">
                  {GenerateAvatar(mail.recipients)}
                  <div className="mail">
                    <p className="sender">{mail.recipients.join(",")}</p>
                    <p className="subject">{mail.subject}</p>
                  </div>
                </div>
                <div className="delete">
                  <p>{format(new Date(mail.time), "MMM d")}</p>
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
              disabled={indexOfLastSentMail >= sentMails.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="Viewing-Mail">
        {composingEmail ? (
          <div className="Mail-Content">
            <h2>Compose Email</h2>
            {composeData && (
              <div className="email-composition">
                <input
                  className="compose-input"
                  type="text"
                  required
                  placeholder="Recipients"
                  ref={recipientsInputRef}
                  value={composeData.recipients}
                  onChange={(e) =>
                    setComposeData({
                      ...composeData,
                      recipients: e.target.value,
                    })
                  }
                />
                <input
                  className="compose-input"
                  type="text"
                  required
                  placeholder="Subject"
                  value={composeData.subject}
                  onChange={(e) =>
                    setComposeData({ ...composeData, subject: e.target.value })
                  }
                />
                <textarea
                  className="compose-textarea"
                  placeholder="Compose your message..."
                  required
                  value={composeData.content}
                  onChange={(e) =>
                    setComposeData({ ...composeData, content: e.target.value })
                  }
                />
                <div className="button-container">
                  <button
                    onClick={handleCancelCompose}
                    className="compose-button cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSend}
                    className="compose-button send-button"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedMail ? (
          <div className="Mail-Content">
            <h3>{selectedMail.subject}</h3>

            <div className="out">
              {GenerateAvatar(selectedMail.recipients)}
              <div className="in">
                <p className="view">From : {selectedMail.sender} </p>
                {/* <p className="view">To : {selectedMail.recipients.join(', ')}</p> */}
                {selectedMail.recipients.length > 1 ? (
                  <>
                    <p className="view">
                      To: {selectedMail.recipients[0]},{" "}
                      {selectedMail.recipients[1]}
                      {selectedMail.recipients.length > 2 ? (
                        <span
                          className="expand-recipients"
                          onClick={() =>
                            toggleRecipientExpansion(!showAllRecipients)
                          }
                        >
                          ...
                        </span>
                      ) : null}
                    </p>
                    {showAllRecipients && (
                      <p className="view">
                        {selectedMail.recipients.slice(2).join(", ")}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="view">To: {selectedMail.recipients[0]}</p>
                )}
              </div>
              <div className="mail-view-time">
                <p>{format(new Date(selectedMail.time), "MMM d h:mm a")}</p>
                <div className="inin">
                  <button onClick={handleForward} className="replyforward">
                    Forward <img src={forward} alt="forward" width="15px" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: selectedMail.content }}
              className="mail-content-html"
            ></div>
          </div>
        ) : sentMails.length > 0 ? (
          <div className="Mail-Content">
            <h2>{sentMails[0].subject}</h2>
            <div className="out">
              {GenerateAvatar(sentMails[0].sender)}
              <div className="in">
                <p className="view sender">From : {sentMails[0].sender}</p>
                <p className="view sender">To : {sentMails[0].recipients}</p>
              </div>
              <div className="mail-view-time">
                <p>{format(new Date(sentMails[0].time), "MMM d h:mm a")}</p>
                <div className="inin">
                  <button onClick={handleForward} className="replyforward">
                    Forward <img src={forward} alt="forward" width="15px" />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: sentMails[0].content }}
              className="mail-content-html"
            ></div>
          </div>
        ) : (
          <h5 style={{ padding: "15px" }}>Select a mail to view</h5>
        )}
      </div>
    </div>
  );
}

export default Outbox;
