import React from "react";
import { NavLink } from "react-router-dom";
import "./LeftSideBar.css";
import sent from "../../Assests/Sent.svg";
import Inbox from "../../Assests/Inbox.svg";
import Trash from "../../Assests/Bin.svg";
import compose from "../../Assests/Compose.svg";
const LeftSideBar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink
          to="/Mail"
          className="side-nav-links "
          activeClassname="active"
        >
          <img
            src={compose}
            alt="Globe"
            width="18px"
            style={{ opacity: "0.7" }}
          />

          <p style={{ paddingLeft: "10px" }}>Compose Mail</p>
        </NavLink>
        <NavLink
          to="/Inbox"
          className="side-nav-links "
          activeClassname="active"
        >
          <img
            src={Inbox}
            alt="Globe"
            width="18px"
            style={{ opacity: "0.7" }}
          />

          <p style={{ paddingLeft: "10px" }}>Inbox</p>
        </NavLink>
        <NavLink
          to="/Outbox"
          className="side-nav-links "
          activeClassname="active"
        >
          <img src={sent} alt="Globe" width="18px" style={{ opacity: "0.7" }} />

          <p style={{ paddingLeft: "10px" }}>Outbox</p>
        </NavLink>
        <NavLink
          to="/Trash"
          className="side-nav-links "
          activeClassname="active"
        >
          <img
            src={Trash}
            alt="Globe"
            width="18px"
            style={{ opacity: "0.7" }}
          />

          <p style={{ paddingLeft: "10px" }}>Trash</p>
        </NavLink>
      </nav>
    </div>
  );
};

export default LeftSideBar;
