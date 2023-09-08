import React, {  useEffect } from "react";
import "./Trash.css";
import LeftSideBar from "../../LeftSideBar/LeftSideBar";
import Navbar from "../../Navbar/Navbar";
import { format } from "date-fns";
import { GenerateAvatar } from "../../Reducers/GenerateAvatar";
import ConfirmationDialog from "../../Reducers/ConfirmationDialog";
import Bin from "../../../Assests/Bin.svg";
import { UseCommonState } from "../../Reducers/UseCommonState";
import axiosInstance from "../../Reducers/AxiosConfig";

function Trash() {

  const{deletedMails,setDeletedMails,loading,setLoading,error,setError,selectedMail,setSelectedMail,selectedMailId,setSelectedMailId,showConfirmation,setShowConfirmation,
        confirmationMessage,setConfirmationMessage,confirmedAction,setConfirmedAction,showAllRecipients,setShowAllRecipients,currentPage,setCurrentPage,initialSelectionDone, setInitialSelectionDone}=UseCommonState();

  const sentMailsPerPage = 10;
  const indexOfLastDeletedMail = currentPage * sentMailsPerPage;
  const indexOfFirstDeletedMail = indexOfLastDeletedMail - sentMailsPerPage;
  const currentDeletedMails = deletedMails.slice(
    indexOfFirstDeletedMail,
    indexOfLastDeletedMail
  );

  const toggleRecipientExpansion = () => {
    setShowAllRecipients(!showAllRecipients);
  };

  useEffect(() => {
    fetchDeletedMails();
  }, []);

  useEffect(() => {
    if (deletedMails.length > 0 && !initialSelectionDone) {
      handleViewMail(deletedMails[0].id);
      setInitialSelectionDone(true);
    }
  }, [deletedMails, initialSelectionDone]);

  const fetchDeletedMails = async () => {
    try {
     
     const response= await axiosInstance.get('/mails/deleted-mails')

      setDeletedMails(response.data.data.reverse());
      setLoading(false);
    } catch (error) {
      setError("Error fetching deleted mails.");
      setTimeout(() => {
        setError("");
      }, 3000);
      setLoading(false);
    }
  };

  const handleViewMail = async (id) => {
    try {
      
      const response=await axiosInstance.get(`/mails/view/${id}`)

      setSelectedMail(response.data);
      setSelectedMailId(id);
    } catch (error) {
      console.error("Error fetching mail details:", error);
      setError("Error fetching mail details.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const handleClearTrash = async () => {
    try {
     
      const response=await axiosInstance.delete('/mails/clear-trash')

      if (response.status === 200) {
        setDeletedMails([]);
      }
    } catch (error) {
      console.error("Error clearing Trash:", error);
    }
  };

  const handleClearTrashConfirmation = () => {
    setConfirmationMessage("Are you sure you want to clear the Trash?");
    setConfirmedAction(() => () => handleClearTrash());
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

  const handledelete = async (id) => {
    try {
      
      await axiosInstance.delete(`/mails/trash/${id}`)
      setDeletedMails(deletedMails.filter((mail) => mail.id !== id));
      if (selectedMailId === id) {
        setSelectedMail(null);
        setSelectedMailId(null);
      }
    } catch (error) {
      setError("Error deleting mail."+error);
    }
  };
  const handledeleteconfirm = (id) => {
    setConfirmationMessage(
      "Are you sure you want to delete this email permanently?"
    );
    setConfirmedAction(() => () => handledelete(id));
    setShowConfirmation(true);
  };
  return (
    <div className="Trash">
      <Navbar>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearTrashConfirmation();
          }}
          className="clear-Trash-button"
        >
          Clear Trash
        </button>
      </Navbar>
      <div className="Mail-List">
        <LeftSideBar />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {currentDeletedMails.map((mail) => (
            <li
              key={mail.id}
              className={mail.id === selectedMailId ? "selected-mail" : ""}
              onClick={() => handleViewMail(mail.id)}
            >
              <div className="mail-f">
                <div className="avatar">
                  {GenerateAvatar(mail.sender)}
                  <div className="mail">
                    <p className="sender">{mail.sender}</p>
                    <p className="subject">{mail.subject}</p>
                  </div>
                </div>
                <div className="delete">
                  <p>{format(new Date(mail.time), "MMM d")}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handledeleteconfirm(mail.id);
                    }}
                    className="del"
                  >
                    <img
                      src={Bin}
                      alt="Bin"
                      width="18px"
                      style={{ opacity: "0.7" }}
                    />
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
              disabled={indexOfLastDeletedMail >= deletedMails.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="Viewing-Mail">
        {selectedMail ? (
          <div className="Mail-Content">
            <h3>{selectedMail.subject}</h3>

            <div className="out">
              {GenerateAvatar(selectedMail.sender)}
              <div className="in">
                <p className="view">From : {selectedMail.sender}</p>
                {/* <p className='view'>To : {selectedMail.recipients.join(', ')}</p> */}
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
                <p>
                  {format(new Date(selectedMail.deletedAt), "MMM d h:mm a")}
                </p>
              </div>
            </div>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: selectedMail.content }}
              className="mail-content-html"
            ></div>
          </div>
        ) : (
          <h5 style={{ padding: "15px" }}>Select a mail to view</h5>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Trash;
