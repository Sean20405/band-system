import { useEffect} from 'react';
import { useHistory } from "react-router-dom";

const Logout = ({ onLogin }) => {
    const history=useHistory();
    history.push('/home')
    useEffect(() => {
        onLogin(null, null);
    }, [])

}
 
export default Logout;