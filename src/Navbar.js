/*
import { Link } from "react-router-dom";
import React, {useStatem, useEffect, useRef } from "react";
import './Navbar.css';

const Navbar = ({user}) => {
    const [activeWidth, setActiveWidth] = useState({ width: 0, height: 0, top: 0, left: 0 });
    const navRef = useRef(null);
    const location = useLocation();

    const updateActiveLinkIndicator = () => {
        const activeItem = navRef.current.querySelector('.active');
        if (activeItem) {
            const { offsetHeight, offsetWidth, offsetTop, offsetLeft } = activeItem;
            setActiveWidth({ height: offsetHeight, width: offsetWidth, top: offsetTop, left: offsetLeft });
        }
    };

    useEffect(() => {
        updateActiveLinkIndicator();
        // Update indicator on window resize
        window.addEventListener('resize', updateActiveLinkIndicator);
        return () => window.removeEventListener('resize', updateActiveLinkIndicator);
    }, [location]);

    return (
      <nav className="navbar">
        <h1>樂團系統</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          
          <div  className="dropdown " >
                                            
            { !user ||user.user=="null" ? (
              <><button className="dropbtn">Login</button><div className="dropdown-content">
                  <Link to="/login">As User</Link>
                  <Link to="/BandLogin">As Band</Link>
                </div></>
            ) : (
              <><button className="dropbtn">{user.user}</button><div className="dropdown-content">
                  <Link to="/Profile">Profile</Link>
                  <Link to="/logout">Logout</Link>
                </div></>
            )}
          </div> 
        </div>
      </nav>
    );
  }
   
export default Navbar;*/




import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './img/Band_System.png';
import './navbar.css'

const Navbar = ({user}) => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/home"><i class="fas fa-home"></i>&nbsp;&nbsp;Home</NavLink>
            </li>
            <li>
              
              <NavLink to="/searchmusician">
                <i class="fas fa-search"></i>&nbsp;&nbsp;Find Members</NavLink>
            </li>
            <li>
              
              <NavLink to="/About"><i class="fas fa-guitar"></i>&nbsp;&nbsp;About</NavLink>
            </li>
                  { !user ||user.user=="null" ? (
                    <>
                      <li>
                        <NavLink to="/login"><i class="fas fa-user"></i>&nbsp;&nbsp;Login As User</NavLink>
                      </li>
                      <li>
                        <NavLink to="/BandLogin"><i class="fas fa-users"></i>&nbsp;&nbsp;Login As Band</NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/Profile"><i class="fas fa-id-card"></i>&nbsp;&nbsp;{user.user}</NavLink>
                      </li>
                      <li>
                        <NavLink to="/logout"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout</NavLink>
                      </li>
                    </>
                  )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
  
