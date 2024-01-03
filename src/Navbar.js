import { Link } from "react-router-dom";
const Navbar = () => {
    return (
      <nav className="navbar">
        <h1>樂團系統</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/create" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>User Sign up</Link>
          <Link to="/create" style={{ 
            color: 'white', 
            backgroundColor: '#f1356d',
            borderRadius: '8px' 
          }}>Make Band</Link>
        </div>
      </nav>
    );
  }
   
  export default Navbar;