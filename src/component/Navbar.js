import React from "react";
import "./Navbar.css";

const Navbar = ({ selected, onSelect, isAuthenticated, onSignIn, onSignOut }) => (
  <nav className="main-navbar">
    <div className="navbar-left">
      <img src={require("../logo.svg")} alt="Logo" className="navbar-logo" />
      <span className="navbar-title">GameTicker</span>
    </div>
    <div className="navbar-right">
      <button className={selected === "cricket" ? "active" : ""} onClick={() => onSelect("cricket")}>Cricket</button>
      <button className={selected === "football" ? "active" : ""} onClick={() => onSelect("football")}>Football</button>
      {!isAuthenticated ? (
        <button onClick={onSignIn}>Sign In / Register</button>
      ) : (
        <button onClick={onSignOut}>Sign Out</button>
      )}
    </div>
  </nav>
);

export default Navbar; 