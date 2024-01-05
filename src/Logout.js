import { useEffect} from 'react';
const Logout = ({ onLogin }) => {
    useEffect(() => {
        onLogin("null");
    }, [])
}
 
export default Logout;