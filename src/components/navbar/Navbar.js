import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import avatar from "../../images/avatar.jpg";
import logo from "../../images/logo.png";
import logout from "../../images/logout-icon.svg";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  let username = "Guest";
  if (data) {
    username = data?.username;
  }

  const openDropdown = () => {
    console.log("open dropdown");
    setIsOpen((prevState) => !prevState);
  };

  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ps-5 pe-5">
          <img
            className="nav-logo"
            alt="Byte"
            src={logo}
            style={{ width: 97 }}
          />
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/transactions">
                Transaction Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/merchant">
                Terminal Management
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                User Management
              </NavLink>
            </li>
          </ul>
          <div className="user-pill" onClick={openDropdown}>
            <div className="pill-content">
              <img className="pill-img" src={avatar} alt="img" />
              <p className="pill-text m-0">{username}</p>
              <div className="pill-icon">
                {isOpen ? (
                  <i className="fa-solid fa-angle-down"></i>
                ) : (
                  <i className="fa-solid fa-angle-right"></i>
                )}
              </div>
            </div>
          </div>
          <div className={isOpen ? "user-menu" : "user-menu hide"}>
            <ul>
              <li onClick={handleSignout}>
                <img className="logout-img" src={logout} alt="logout" />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
