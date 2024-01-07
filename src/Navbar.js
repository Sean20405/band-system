import { Link } from "react-router-dom";
import { useState, useEffect  } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './img/Band_System.png';
import './Navbar.css'


const Navbar = ({user, role}) => {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
    let profile = "/Profile";
    if (role === "band"){
      profile = "/BandProfile"
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
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/About">About</NavLink>
            </li>
            <li>
              <div  className="dropdown " >                         
                  { !user ||user.user=="null" ? (
                    <><button className="dropbtn">Login</button><div className="dropdown-content">
                        <Link to="/login">As User</Link>
                        <Link to="/BandLogin">As Band</Link>
                      </div></>
                  ) : (
                    <><button className="dropbtn">{user.user}</button><div className="dropdown-content">
                        <Link to={profile}>Profile</Link>
                        <Link to="/logout">Logout</Link>
                      </div></>
                  )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
      
    );
  }
   
export default Navbar;





