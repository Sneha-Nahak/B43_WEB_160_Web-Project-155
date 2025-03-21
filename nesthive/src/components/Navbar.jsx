import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/NestHive-logo.png";
import "../index.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="nav">
      <img src={logo} alt="logo" />
      <div className="nav-link">
        <NavLink className='anchors' to='/'>Home</NavLink>
        <NavLink className='anchors' to='/buyers'>For Buyers</NavLink>
        <NavLink className='anchors' to='/tenants'>For Tenants</NavLink>
        <NavLink className='anchors' to='/owners'>For Owners</NavLink>
        {user ? (
          <button className="logout-btn" onClick={logout}>Logout</button>
        ) : (
          <NavLink className='anchors' to='/login'>Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
