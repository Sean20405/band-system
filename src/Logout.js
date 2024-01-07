import { useEffect} from 'react';

const Logout = ({ onLogin }) => {
    useEffect(() => {
        onLogin(null, null);
    }, [])
    return
}
 
export default Logout;