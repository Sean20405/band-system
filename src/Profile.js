import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Profile = ({user}) => {
    return  <h1>Welcome, {user.role} {user.user}!</h1>; 
}
 
export default Profile;