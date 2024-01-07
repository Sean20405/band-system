import { useEffect} from 'react';

const Logout = ({ onLogin }) => {
    useEffect(() => {
        onLogin(null, null);
    }, [])

}
 
export default Logout;