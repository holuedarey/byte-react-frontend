import React from 'react';
import { NavLink } from 'react-router-dom';
import avatar from '../../images/avatar.jpg';
import logo from '../../images/logo.png';
import './Navbar.css'

export default function Navbar() {
  const data = JSON.parse(localStorage.getItem('user'));
  let username = "Guest"
  if(data){
    username = data?.username;
  }
  return (
    <>
    <nav className='navbar'>
      <div className='container-fluid ps-5 pe-5'>
      <img className='nav-logo' alt='Byte' src={logo} style={{width: 97}} />
      <ul className='navbar-nav'>
        <li className='nav-item'>
          <NavLink className='nav-link' to="/transactions" >Transaction Dashboard</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to="/merchant" >Merchant Management</NavLink>
        </li>
        {/* <li className='nav-item'>
          <NavLink className='nav-link' to="/settlement">Settlement</NavLink>
        </li>
        <li className='nav-item'>
          <NavLink className='nav-link' to="/dispute">Dispute Resolution</NavLink>
        </li> */}
        <li className='nav-item'>
          <NavLink className='nav-link' to="/config">Configuration</NavLink>
        </li>
      </ul>
      <div className='user-pill'>
        <div className='row pill-content'>
          <div className='col-2'>
            <img className='pill-img' src={avatar} alt='img'/>
          </div>
          <div className='col-8 ps-1'>
            <p className='pill-text'>
              {username}
            </p>
          </div>
          <div className='col-2 pill-icon'><i className="fa-solid fa-angle-right"></i></div>
        </div>
      </div>
      </div>
    </nav>
    </>
  )
}
