import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ConfirmationDialog from "../Reducers/ConfirmationDialog";

function Navbar({ children }) {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false); // Manage confirmation dialog visibility
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmedAction, setConfirmedAction] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  function handleClick() {
    navigate("/Inbox");
  }

  const handleLogoutConfirmation = () => {
    setConfirmationMessage("Are you sure you want to Logout?");
    setConfirmedAction(() => () => handleLogout());
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

  return (
    <nav className="main-nav">
      <div className="Navbar">
        <h2 onClick={handleClick} className="logo">
          Hit Mail
        </h2>

        <input type="text" placeholder="Search..." className="SearchBar" />
      </div>
      <div className="Navbar-right">
        {children}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLogoutConfirmation();
          }}
          className="LogoutButton"
        >
          Logout
        </button>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message={confirmationMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </nav>
  );
}

export default Navbar;
