import { useEffect } from "react";
import { Link } from "react-router-dom";
const Navbar = ({user, role}) => {

    let profile = "/Profile";
    if (role === "band"){
      profile = "/BandProfile"
    }
    
      
    return (
      <nav className="navbar">
        <h1>樂團系統</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          
          <div  className="dropdown " >
                                            
            { !user ||user.user==="null" ? (
              <><button className="dropbtn">Login</button><div className="dropdown-content">
                  <Link to="/login">As User</Link>
                  <Link to="/BandLogin">As Band</Link>
                </div></>
            ) : (
              <><button className="dropbtn">{user.user}</button><div className="dropdown-content">
                  <Link to={profile}>{profile}</Link>
                  <Link to="/logout">Logout</Link>
                </div></>
            )}
          </div> 
        </div>
      </nav>
    );
  }
   
  export default Navbar;