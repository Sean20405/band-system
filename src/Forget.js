import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import emailjs from '@emailjs/browser';
const Forget = () => {

    const [id, setId] = useState('');
    const [mail, setMail] = useState('');
    const [info, setInfo] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const idRef = useRef();
    const mailRef = useRef();

    useEffect(()=>{
        if(info){
            console.log(info);
            if(info.status == "Failed"){
                setErrMsg('Unauthorized');
            }
            else if(info.email == mail){
                setSuccess(true);
            }
            else {
                setErrMsg('mail incorrect');
            };
        }
    },[info])

    const form = useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://100.25.158.3:5000/user?user_id=' + id,{
            method: "Get",
            headers:{
                "ngrok-skip-browser-warning": "69420"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setInfo(data);
        })
        .catch(err => {
            console.log(err.message);
        })
        emailjs.sendForm('service_band','template_ot2ru8f',form.current,'K7JxayUwMKsXWf5YO')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }
    return ( 
        <div className="login">   
            <h1>Forget Password</h1>
            <p  className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <form ref={form} onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="name"
                    id="username"
                    name="name"
                    autoComplete="off"
                    required
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />

                <label htmlFor="password">Email:</label>
                
                <input
                    name="recipient"
                    type="email"
                    id="password"
                    required
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                />
                <button>Sign In</button>
            </form>
        </div>
     );
}
 
export default Forget;